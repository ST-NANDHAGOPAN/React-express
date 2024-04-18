/* eslint-disable jsx-a11y/anchor-is-valid */
export function Dropdown1() {
    return (
        <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-6 w-250px w-md-300px py-4'
            data-kt-menu='true'
        >
            <div className='px-7 py-5'>
                <div className='fs-5 text-dark text-center fw-bolder'>List Options</div>
            </div>
            <div className='menu-item px-3'>
                <a className='menu-link px-3'>Add card</a>
            </div>
            <div className='menu-item px-3'>
                <a className='menu-link px-3'>Archive List</a>
            </div>
        </div>
    )
}
