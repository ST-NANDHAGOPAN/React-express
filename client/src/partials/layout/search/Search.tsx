/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaWindowMaximize } from 'react-icons/fa6'
import { KTIcon } from '../../../helpers'
import { IoIosReturnRight } from 'react-icons/io'

const Search = ({ searchTerm }: { searchTerm: string }) => {

  const searchItems = [
    { name: "ffghh", card: "NYC Seating : Completed" },
    { name: "wsdwd", card: "Eyeball : Pending" },
    { name: "sdf", card: "TM THrive : To Do" },
    { name: "dsf", card: "NYC Seating : To Do" },
    { name: "qwrwer", card: "NYC Seating : In Progress" },
  ]
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-750px w-lg-775px'
      data-kt-menu='true'
    >
      <div className='d-flex flex-column px-9'>
        <div className='pt-2 pb-0'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Cards</span>
        </div>
        {searchItems.length > 0 && searchItems.filter(item =>
          item.name.toLowerCase().includes(searchTerm)
        )?.map((i: { name: string, card: string }) =>
          <div className='menu-item' key={i.name}>
            <div className='menu-link p-0 ps-2'>
              <span className='cursor-pointer popup-search-card-icon '>
                <FaWindowMaximize />
              </span>
              <div className='d-flex ms-4 flex-column'>
                <span>{i?.name}</span>
                <span className='text-muted'>{i.card}</span>
              </div>
            </div>
          </div>)}
        <div className='separator my-2'></div>
        <div className='menu-item'>
          <div className='menu-link p-0 ps-2 d-flex justify-content-between'>
            <div>
              <div className='btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary'>
                <KTIcon iconName='magnifier' className='fs-2' />
              </div>
              <span className='ms-7'>Advanced Search</span>

            </div>

            <span className='cursor-pointer fs-6 fw-bolder p-3'><IoIosReturnRight /></span>
          </div>
        </div>

      </div>
    </div >
  )
}

export { Search }
