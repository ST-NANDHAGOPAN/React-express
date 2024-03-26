import { useAuth } from '../auth'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
function UserComponent() {
  const { logout} = useAuth()
  const intl = useIntl()

  return (
    <>
    <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
    <div>UserComponent
      <div className='menu-item px-5'>
        <button 
        onClick={logout} 
        className='menu-link px-5'
        >
          Sign Out
        </button>
      </div>
    </div>
  </>
   
  )
}

export default UserComponent

