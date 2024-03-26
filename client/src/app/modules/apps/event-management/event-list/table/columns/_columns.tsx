// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Event_Organizer_Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='date' className='min-w-125px' />,
    accessor: 'joined_day',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='event_name' className='min-w-125px' />
    ),
    id: 'event',
    Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='place' className='min-w-125px' />
    ),
    id: 'place',
    Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].two_steps} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='address' className='min-w-125px' />
    ),
    accessor: 'address',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Bookings' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
