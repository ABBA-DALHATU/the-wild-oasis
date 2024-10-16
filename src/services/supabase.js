import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://swlywcviyajfpqonqidk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3bHl3Y3ZpeWFqZnBxb25xaWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MjM2ODEsImV4cCI6MjA0MTQ5OTY4MX0.4_AHXau28Z7CfqZtmvqfC-0SDgMYzLCdomny9TI8BKs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
