import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  _id?: ID
 user_id?: ID
 first_name?: string
 last_name?: string
  address?: string
  phone_no?: string
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  _id:'',
  user_id: '',
  first_name: '',
  last_name:'',
  address: '',
  phone_no:''
}
