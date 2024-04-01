/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { MenuComponent } from '../../../../../../../_metronic/assets/ts/components'
import { ID, QUERIES } from '../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deleteUser } from '../../core/_requests'
type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate ,setIsEdit } = useListView()
  const { query } = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
    setIsEdit(true)
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <div>
        <a className='menu-link ' onClick={openEditModal}>
          <i className="bi bi-pencil-square fs-5 btn btn-primary me-3"></i>
        </a>
        <a
          className='menu-link '
          data-kt-users-table-filter='delete_row'
          onClick={async () => await deleteItem.mutateAsync()}
        >
          <i className="bi bi-trash fs-5 btn btn-danger"></i>
        </a>
      </div>
    </>
  )
}

export { UserActionsCell }
