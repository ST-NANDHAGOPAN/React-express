import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL
console.log("API_URL",API_URL);

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const ADMIN_LOGIN_URL = `${API_URL}/admin/login`;
export const USER_LOGIN_URL = `${API_URL}/user/login`;

export const ADMIN_REGISTER_URL = `${API_URL}/admin/register`;
export const USER_REGISTER_URL = `${API_URL}/user/register`;

export const ADMIN_REQUEST_PASSWORD_URL = `${API_URL}/admin/forgot-password`;
export const USER_REQUEST_PASSWORD_URL = `${API_URL}/user/forgot-password`;

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
  password: string,
  password_confirmation: string
) {
  return axios.post(ADMIN_REGISTER_URL, {
    email,
    password,
    password_confirmation,
  })
}
export function userRegister(
  email: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(USER_REGISTER_URL, {
    email,
    password,
    password_confirmation,
  })
}
// Server should return object => { result: boolean } (Is Email in DB)
export function AdminRequestPassword(email: string) {
  return axios.post<{result: boolean}>(ADMIN_REQUEST_PASSWORD_URL, {
    email,
  })
}
// Server should return object => { result: boolean } (Is Email in DB)
export function UserRequestPassword(email: string) {
  return axios.post<{result: boolean}>(USER_REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
    return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    token: token,
  })
}
