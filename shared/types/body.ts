export interface RegisterBody {
  name: string
  email: string
  password: string
}

export interface RefreshBody {
  refresh_token: string
}
