import { FC, useState } from 'react'
// import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isNotEmpty } from '../../../../../../_metronic/helpers'
import { initialUser, User } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { createUser, updateUser } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user: User
}

// const editUserSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Wrong email format')
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Email is required'),
//   name: Yup.string()
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Name is required'),
// })

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { isedit, setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    _id: user._id || initialUser._id,
    user_id: user.user_id || initialUser.user_id,
    first_name: user.first_name || initialUser.first_name,
    last_name: user.last_name || initialUser.last_name,
    address: user.address || initialUser.address,
    phone_no: user.phone_no || initialUser.phone_no,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: userForEdit,
    // validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        
        if (isNotEmpty(values._id)) {
          await updateUser(values, values._id);
        } else {
          const token = localStorage.getItem("token")
          const { _id, user_id, ...userData } = values;

          await createUser(userData,token);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(false);
        cancel(true);
      }
    },
  });




  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          
          {isedit &&
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>ID</label>
            <input
              placeholder='Full name'
              {...formik.getFieldProps('_id')}
              type='text'
              name='_id'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0 disabled-input',
                { 'is-invalid': formik.touched._id && formik.errors._id },
                {
                  'is-valid': formik.touched._id && !formik.errors._id,
                },
              )}
              autoComplete='off'
              disabled={true}
              readOnly
            />
            {formik.touched._id && formik.errors._id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors._id}</span>
                </div>
              </div>
            )}
          </div>
        }
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>FirstName</label>
            <input
              placeholder='FirstName'
              {...formik.getFieldProps('first_name')}
              type='text'
              name='first_name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.first_name && formik.errors.first_name },
                {
                  'is-valid': formik.touched.first_name && !formik.errors.first_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.first_name}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>LastName</label>
            <input
              placeholder='LastName'
              {...formik.getFieldProps('last_name')}
              type='text'
              name='last_name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.last_name && formik.errors.last_name },
                {
                  'is-valid': formik.touched.last_name && !formik.errors.last_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.last_name}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Address</label>
            <input
              placeholder='Address'
              {...formik.getFieldProps('address')}
              type='text'
              name='address'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.address && formik.errors.address },
                {
                  'is-valid': formik.touched.address && !formik.errors.address,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.address && formik.errors.address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.address}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Phone_no</label>
            <input
              placeholder='phone_no'
              {...formik.getFieldProps('phone_no')}
              type='text'
              name='phone_no'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.phone_no && formik.errors.phone_no },
                {
                  'is-valid': formik.touched.phone_no && !formik.errors.phone_no,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.phone_no && formik.errors.phone_no && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.phone_no}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>

      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export { UserEditModalForm }
