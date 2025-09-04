export interface RegisterBody extends LoginBody {
  name: string
}

export interface LoginBody {
  email: string
  password: string
}
