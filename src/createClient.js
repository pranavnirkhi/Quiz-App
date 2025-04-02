import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ykrwcnnodwsrqietzxhy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrcndjbm5vZHdzcnFpZXR6eGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Nzc1NzMsImV4cCI6MjA1ODU1MzU3M30.3VIj8902jb7k0oiarhnGOrshuiMnGqzRp9tjWE0WH_k"
);
