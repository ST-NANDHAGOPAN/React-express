import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
const GET_USERS_URL = `http://localhost:5000/api/user-register`

const getUsers = (query: string): Promise<UsersQueryResponse> => {  
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${GET_USERS_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${GET_USERS_URL}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: User): Promise<User | undefined> => {
  return axios
    .put(`${GET_USERS_URL}/${user._id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${GET_USERS_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {  
  const requests = userIds.map((id) => axios.delete(`${GET_USERS_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
