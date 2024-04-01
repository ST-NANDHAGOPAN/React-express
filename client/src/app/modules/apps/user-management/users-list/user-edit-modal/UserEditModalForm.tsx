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

  const [userForEdit, setUserForEdit] = useState<User>({
    ...user,
    _id: user._id || initialUser._id,
    name: user.name || initialUser.name,
    email: user.email || initialUser.email,
    age: user.age || initialUser.age,
    address: user.address || initialUser.address,
    image: user.image || initialUser.image,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0]
      setUserForEdit((prevUser) => ({
        ...prevUser,
        image: imageFile,
      }))
    }

  }
  const formik = useFormik({
    initialValues: userForEdit,
    // validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values", values);

      setSubmitting(true);
      try {
        const formData = new FormData();
        if (userForEdit.image) {
          formData.append("image", userForEdit.image as Blob); // Cast userForEdit.image to Blob
        }

        Object.entries(values).forEach(([key, value]) => {
          if (key !== "image" && value !== null && value !== undefined) {
            formData.append(key, value); // Convert value to string and append
          }
        });

        if (isNotEmpty(values._id)) {
          await updateUser(formData, values._id);
        } else {
          await createUser(formData);
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
          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>Image</label>
            <input
              title='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='form-control form-control-solid mb-3 mb-lg-0'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {userForEdit.image && userForEdit.image.type && userForEdit.image.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(userForEdit.image)}
                alt='Preview'
                style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '5px' }}
              />
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Name</label>
            <input
              placeholder='Full name'
              {...formik.getFieldProps('name')}
              type='text'
              name='name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.name && formik.errors.name },
                {
                  'is-valid': formik.touched.name && !formik.errors.name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>

            <label className='required fw-bold fs-6 mb-2'>Email</label>
            <input
              placeholder='Email'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.email && formik.errors.email },
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
              type='email'
              name='email'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Age</label>
            <input
              placeholder='Age'
              {...formik.getFieldProps('age')}
              type='text'
              name='age'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.age && formik.errors.age },
                {
                  'is-valid': formik.touched.age && !formik.errors.age,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.age && formik.errors.age && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.age}</span>
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
