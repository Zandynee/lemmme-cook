import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Kunci Anon dari environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Membuat dan mengekspor klien Supabase
// Klien ini akan menjadi satu-satunya instance yang digunakan di seluruh aplikasi (singleton)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);