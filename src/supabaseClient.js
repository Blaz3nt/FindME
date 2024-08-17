// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vcuzujgqocvscrpgdigd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjdXp1amdxb2N2c2NycGdkaWdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzc3MjkyMSwiZXhwIjoyMDM5MzQ4OTIxfQ.mLrGo24d1HbKTQ_z06bVGMvdI-vYDP4JLcuuEVWVyA4';

// Create a Supabase client with the anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
