import { createClient } from '@supabase/supabase-js';

// TODO: Apna Supabase URL aur Key daalna hai
const supabaseUrl = 'https://mziqrvohwzmqnxmdozxe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16aXFydm9od3ptcW54bWRvenhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTQwMzQsImV4cCI6MjA4MDYzMDAzNH0.aiQBj1fIugoNaT5-0KnAE5NQaQx5kddWZnTBWrHQ9bY';

export const supabase = createClient(supabaseUrl, supabaseKey);