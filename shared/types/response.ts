import type { Session, User } from '@supabase/auth-js'

export interface AuthResponse {
  user: User
  session: Session
}
