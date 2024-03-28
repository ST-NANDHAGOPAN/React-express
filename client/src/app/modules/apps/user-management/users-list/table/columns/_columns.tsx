// @ts-nocheck
import { Column } from 'react-table'
import { UserActionsCell } from './UserActionsCell'
import { UserSelectionCell } from './UserSelectionCell'
import { UserCustomHeader } from './UserCustomHeader'
import { UserSelectionHeader} from './UserSelectionHeader'
import { User } from '../../core/_models'
import logo from "./images/imagenotfound2.jpg"
const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => <UserSelectionCell id={props.data[props.row.index]._id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Image' className='min-w-125px' />,
    accessor: 'image',
    Cell: ({ ...props }) => {
      const file = props.data[props.row.index].image
      let userImg = logo;
      try {
        userImg = require(`../../../../../../../../../server/public/uploads/${file}`);
      } catch (err) {
        // Just Leave it empty
        // console.error("Error loading product image:", err);
      }
    return(
    <img src={userImg} alt="User" style={{ width: '50px', height: '50px' , borderRadius:"50%" }} />)},
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    accessor: 'name',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Age' className='min-w-125px' />,
    accessor: 'age',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    accessor: 'email',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Address' className='min-w-125px' />
    ),
    accessor: 'address',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <UserActionsCell id={props.data[props.row.index]._id} />,
  },
  ]

export { usersColumns }
