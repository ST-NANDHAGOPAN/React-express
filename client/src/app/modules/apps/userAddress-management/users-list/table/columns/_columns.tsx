// @ts-nocheck
import { Column } from 'react-table'
import { UserActionsCell } from './UserActionsCell'
import { UserSelectionCell } from './UserSelectionCell'
import { UserCustomHeader } from './UserCustomHeader'
import { UserSelectionHeader} from './UserSelectionHeader'
import { User } from '../../core/_models'
const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => <UserSelectionCell id={props.data[props.row.index]._id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='UserId' className='min-w-125px' />,
    accessor: 'user_id',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='FirstName' className='min-w-125px' />,
    accessor: 'first_name',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='LastName' className='min-w-125px' />,
    accessor: 'last_name',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Address' className='min-w-125px' />
    ),
    accessor: 'address',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Phone_NO' className='min-w-125px' />
    ),
    accessor: 'phone_no',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <UserActionsCell id={props.data[props.row.index]._id} />,
  },
  ]

export { usersColumns }
