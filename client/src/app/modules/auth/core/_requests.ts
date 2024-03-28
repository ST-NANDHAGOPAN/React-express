import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `http://localhost:5000/api/verify_token`
export const ADMIN_LOGIN_URL = `http://localhost:5000/api/admin/login`
export const USER_LOGIN_URL = `http://localhost:5000/api/user/login`

export const ADMIN_REGISTER_URL = `http://localhost:5000/api/admin/register`
export const USER_REGISTER_URL = `http://localhost:5000/api/user/register`

export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function adminLogin(email: string, password: string) {
  return axios.post<AuthModel>(ADMIN_LOGIN_URL, {
    email,
    password,
  })
}
export function userLogin(email: string, password: string) {
  return axios.post<AuthModel>(USER_LOGIN_URL, {
    email,
    password,
  })
}
// Server should return AuthModel

export function adminRegister(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(ADMIN_REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}
export function userRegister(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(USER_REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}
// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
    return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    token: token,
  })
}
