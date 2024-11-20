import type { User as SupabaseUser } from '@supabase/supabase-js'
export type User = SupabaseUser

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: Date;
  status: string;
  user_id: string;
}
