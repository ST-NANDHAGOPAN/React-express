/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {
  defaultAlerts,
  defaultLogs,
  KTIcon,
  toAbsoluteUrl,
  useIllustrationsPath,
} from '../../../helpers'

const HeaderNotificationsMenu: FC = () => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
    data-kt-menu='true'
  >
    <div
      className='d-flex flex-column bgi-no-repeat rounded-top'
      style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/menu-header-bg.jpg')}')`}}
    >
      
    </div>

    <div className='tab-content'>

      <div className='tab-pane fade show active' id='kt_topbar_notifications_2' role='tabpanel'>
        <div className='d-flex flex-column px-9'>
          <div className='pt-10 pb-0'>
            <h3 className='text-dark text-center fw-bolder'>Get Pro Access</h3>

            <div className='text-center text-gray-600 fw-bold pt-1'>
              Outlines keep you honest. They stoping you from amazing poorly about drive
            </div>

            <div className='text-center mt-5 mb-9'>
              <a
                href='#'
                className='btn btn-sm btn-primary px-6'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_upgrade_plan'
              >
                Upgrade
              </a>
            </div>
          </div>

          <div className='text-center px-4'>
            <img className='mw-100 mh-200px' alt='metronic' src={useIllustrationsPath('1.png')} />
          </div>
        </div>
      </div>

    </div>
  </div>
)

export {HeaderNotificationsMenu}
