/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { PiDotsThreeOutlineVertical } from "react-icons/pi";


const HeaderNotificationsMenu: FC = () => {

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-450px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3 pb-5'>
        <div className='menu-content d-flex  justify-content-between px-3'>
          <div className='fw-bolder fs-5'>
            <h1>Notification</h1>
          </div>
          <div>
            <label className='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack pt-1'>
              <span className='form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2'>
                Only show unread
              </span>
              <input className='form-check-input' type='checkbox' value='1' defaultChecked />
            </label>
          </div>
          <span className='ms-4'><PiDotsThreeOutlineVertical />
            </span>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className="text-center p-5 mb-10" data-testid="notifications-empty-state">
        <img alt="Taco" src="	https://trello.com/assets/ee2660df9335718b1a80.svg"/>
        <h3>No unread notifications</h3>
        </div>
      
    </div>
  )
}

export { HeaderNotificationsMenu }
