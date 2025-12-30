
import { createClient } from '@supabase/supabase-js';

// User-provided credentials for direct setup
const supabaseUrl = 'https://dztpqnfvdkbmonqbwzvx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6dHBxbmZ2ZGtibW9ucWJ3enZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NTIzOTcsImV4cCI6MjA4MjQyODM5N30.TwV2XNuqgZICCGOA5uspM4cB-MBxYZxA9wt_4dZbTF0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
