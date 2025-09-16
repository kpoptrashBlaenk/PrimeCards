interface RegisterBody extends LoginBody {
  name: string
}

interface LoginBody {
  email: string
  password: string
}

interface SettingsAccountBody {
  name?: string
}
