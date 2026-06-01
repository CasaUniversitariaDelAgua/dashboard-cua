import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bczlxyzhhhspdgrrfvkr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjemx4eXpoaGhzcGRncnJmdmtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDI1NzE5MCwiZXhwIjoyMDk1ODMzMTkwfQ.kubPX_v7KhNu9jEW1EvGOBl-cHDo7T4kip2tUBM084c";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase as s };
