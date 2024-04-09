export interface AuthModel {
  token: string
  refreshToken?: string
}

export interface UserModel {
  decoded : {
    email: string
    password: string | undefined
  }
  valid :boolean
}
