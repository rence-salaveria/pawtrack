
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dbprbdmabmwnvngzpkmn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicHJiZG1hYm13bnZuZ3pwa21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMjI4MDYsImV4cCI6MjAzMDc5ODgwNn0.ixiR61B4MfSZ__BfqCmDUgzOHGOfKI36NkKwvPVfZYU";

export const supabase = createClient(supabaseUrl!, supabaseKey!);
