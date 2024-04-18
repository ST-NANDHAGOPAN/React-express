/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react'
import {KTIcon} from '../../../helpers'

const UsersListSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  return (
    <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-750px ps-14'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export {UsersListSearchComponent}
