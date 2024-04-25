import React, { useState } from 'react';
import { KTIcon } from '../../../helpers';

const UsersListSearchComponent = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`card-title search-container ${isFocused ? 'focused' : ''}`}
      onClick={handleFocus}>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid ps-14'
          placeholder='Search'
          value={value}
          onChange={onChange}

          onBlur={handleBlur}
        />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { UsersListSearchComponent };
