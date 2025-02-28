import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bxgncaynbsfnazsqoqkh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4Z25jYXluYnNmbmF6c3FvcWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNDIwMjUsImV4cCI6MjAzMTYxODAyNX0.yKXJ5NcMtUi0Z9j9dVfFbjgAFMXV9NjlcED9HwSz1Ts'
export const supabase = createClient(supabaseUrl, supabaseKey)