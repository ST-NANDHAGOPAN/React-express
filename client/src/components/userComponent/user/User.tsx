import { useAuth } from '../../../auth'
import {PageTitle} from '../../../layout/core'
function UserComponent() {
  const { logout} = useAuth()

  return (
    <>
    <PageTitle breadcrumbs={[]}>DASHBOARD</PageTitle>
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

