'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  // STATE BARU: Gunakan Set untuk performa cek yang cepat .has()
  const [bookmarks, setBookmarks] = useState(new Set()); 
  const [loading, setLoading] = useState(true);

  // FUNGSI BARU: untuk mengambil bookmark
  const fetchBookmarks = useCallback(async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('bookmarks')
      .select('recipe_id')
      .eq('user_id', userId);

    if (!error && data) {
      // Simpan hanya ID resepnya ke dalam Set
      const bookmarkSet = new Set(data.map(b => b.recipe_id));
      setBookmarks(bookmarkSet);
    }
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        // Ambil profil dan bookmark saat load awal
        const { data: userProfile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
        setProfile(userProfile || null);
        await fetchBookmarks(session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          const { data: userProfile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
          setProfile(userProfile || null);
          await fetchBookmarks(session.user.id); // Ambil bookmark saat login
        } else {
          setProfile(null);
          setBookmarks(new Set()); // Kosongkan bookmark saat logout
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchBookmarks]);

  const value = {
    session,
    user: session?.user,
    profile,
    bookmarks, // Bagikan data bookmark
    refetchBookmarks: () => session && fetchBookmarks(session.user.id), // Fungsi untuk refresh
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}