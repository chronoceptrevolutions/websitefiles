/* ============================================================
   SUPABASE CONNECTION
   Public "anon" key — safe to expose in client-side code by design;
   it can only do what our Row Level Security policies allow (insert
   new subscribers/submissions, nothing else).
   ============================================================ */
const supabaseClient = window.supabase.createClient(
  "https://bsrnubnpkwazrgahytve.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcm51Ym5wa3dhenJnYWh5dHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMjgxOTAsImV4cCI6MjEwNDcwNDE5MH0.nGqfywl24-1BRWtinQaXNRIrcQ5re8xEhVk1CJAHIU8"
);
