"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { IoBookmark, IoBookOutline, IoLogIn, IoPersonAdd, IoLogOut } from "react-icons/io5";
import SearchBar from './SearchBar';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';



export default function Sidebar({ setBlurActive }) {
  const { session, profile } = useAuth(); // Ambil `session` dan `profile`
  const router = useRouter();

  // ... (semua ref dan fungsi animasi GSAP Anda tidak perlu diubah)
  const sidebarRef = useRef(null);
  const textLogoRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const linksContainerRef = useRef(null);
  const timelineRef = useRef(null);
  useEffect(() => {
    gsap.set(linksContainerRef.current, { x: -200, opacity: 0 });
    gsap.set(textLogoRef.current, { x: -50, opacity: 0 });
    gsap.set(sidebarRef.current, { width: '80px' });
    gsap.set(iconsContainerRef.current, { x: 0 });
  }, []);
  const handleMouseEnter = () => { if (setBlurActive) setBlurActive(true); if (timelineRef.current) timelineRef.current.kill(); const tl = gsap.timeline(); timelineRef.current = tl; tl.to(sidebarRef.current, { width: '280px', duration: 0.3, ease: 'power2.out' }).to(iconsContainerRef.current, { x: -80, opacity: 0, duration: 0.2, ease: 'power2.out' }, '<').to([textLogoRef.current, linksContainerRef.current], { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'power2.out' }, '-=0.2');};
  const handleMouseLeave = () => { if (setBlurActive) setBlurActive(false); if (timelineRef.current) timelineRef.current.kill(); const tl = gsap.timeline(); timelineRef.current = tl; tl.to([linksContainerRef.current, textLogoRef.current], { x: -50, opacity: 0, duration: 0.2, stagger: -0.1, ease: 'power2.in' }).to(iconsContainerRef.current, { x: 0, opacity: 1, duration: 0.2, ease: 'power2.in' }, '-=0.1').to(sidebarRef.current, { width: '80px', duration: 0.3, ease: 'power2.in' }, '<');};

  // Definisikan menu untuk guest dan user
  const guestItems = [
    { href: '/login', text: 'Login', icon: <IoLogIn /> },
    { href: '/signup', text: 'Sign Up', icon: <IoPersonAdd /> },
  ];
  const userItems = [
    { href: '/my-recipe', text: 'My Recipes', icon: <IoBookOutline /> },
    { href: '/bookmark', text: 'Bookmarks', icon: <IoBookmark /> },
  ];

  const handleLogout = async () => {
    if (setBlurActive) setBlurActive(false);
    await supabase.auth.signOut();
    router.push('/');
  };

  const NavLink = ({ href, icon, text }) => (
    <Link href={href} className="flex items-center gap-4 p-3 text-lg text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
      <span className="text-2xl">{icon}</span>
      <span>{text}</span>
    </Link>
  );

  return (
    <div
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-screen bg-stone-100 overflow-hidden fixed left-0 top-0 z-50 flex flex-col"
    >
      <Link href="/" className="flex items-center p-4 h-[80px] flex-shrink-0">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <div ref={textLogoRef} className="ml-2">
          <Image src="/logoText.png" alt="LemmeCook" width={150} height={30} />
        </div>
      </Link>

      {/* Tampilan Collapsed (Ikon) - Logikanya sudah benar */}
      <div ref={iconsContainerRef} className="absolute top-[80px] left-[22px] flex flex-col items-center gap-6 text-3xl text-gray-500">
        {(session ? userItems : guestItems).map((item) => <div key={item.href}>{item.icon}</div>)}
        {session && <div><IoLogOut /></div>}
      </div>

      {/* Tampilan Expanded (Teks & Menu) */}
      <div ref={linksContainerRef} className="p-4 flex flex-col justify-between flex-grow">
        {/* Bagian Atas: Menu Utama */}
        <div className="space-y-2">
          <div className="mb-4"><SearchBar /></div>
          {(session ? userItems : guestItems).map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon} text={item.text} />
          ))}
        </div>

        {/* ========================================================== */}
        {/* BAGIAN BAWAH YANG DIPERBAIKI */}
        {/* ========================================================== */}
        {/* Wrapper ini hanya muncul jika pengguna sudah login */}
        {session && (
          <div className="space-y-2 pt-4 border-t border-gray-300">
            {/* Tombol Logout selalu ada jika sudah login */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 p-3 text-lg text-gray-700 rounded-lg hover:bg-gray-200 transition-colors w-full"
            >
              <span className="text-2xl"><IoLogOut /></span>
              <span>Logout</span>
            </button>
            
            {/* Info Profil: Tampilkan jika data profil sudah siap, jika belum tampilkan 'loading' */}
            {profile ? (
              <div className="flex items-center gap-3 p-2">
                <Image 
                  src={profile.photo_url || '/default-avatar.png'}
                  alt={profile.username || 'User Avatar'}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-800">{profile.username || 'New User'}</p>
                  <p className="text-sm text-gray-500 truncate">{session.user.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 p-2 h-[56px] flex items-center">
                <span>Loading profile...</span>
              </div>
            )}
          </div>
        )}
        {/* ========================================================== */}
      </div>
    </div>
  );
}