import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  _id?: ID
  name?: string
  email?: string
  age?: string
  address?: string
  
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  name: '',
  email: '',
  age: '',
  address: '',
}
