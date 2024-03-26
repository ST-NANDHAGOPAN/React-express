import {KTIcon} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'

const UserEditModalHeader = () => {
  const {isedit ,setItemIdForUpdate } = useListView()
   
  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
     {isedit ? (<h2 className='fw-bolder'>Edit User</h2>) 
     :(<h2 className='fw-bolder'>Add User</h2>)
     }
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTIcon iconName='cross' className='fs-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {UserEditModalHeader}
