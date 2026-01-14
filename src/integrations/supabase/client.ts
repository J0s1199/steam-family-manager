import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://firmhdurxnxafkwclkxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpcm1oZHVyeG54YWZrd2Nsa3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MDAyNjQsImV4cCI6MjA4Mzk3NjI2NH0.bCyYoD-Zu1S3hptuhDFFzTAibm1foH-6dzgSgbrJlUM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);