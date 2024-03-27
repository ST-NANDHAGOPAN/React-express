import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  _id?: ID
  name?: string
  email?: string
  age?: string
  address?: string
  image?:File | null; 
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  _id:'',
  name: '',
  email: '',
  age: '',
  address: '',
  image:null
}
