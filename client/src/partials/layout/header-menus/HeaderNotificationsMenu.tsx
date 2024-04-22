import { FC, useState } from 'react';
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

const HeaderNotificationsMenu: FC = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowWelcomeMessage(event.target.checked);
  };

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
              <input
                className='form-check-input'
                type='checkbox'
                value='1'
                checked={showWelcomeMessage}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <span className='ms-4'><PiDotsThreeOutlineVertical /></span>
        </div>
      </div>

      <div className='separator my-2'></div>

      {showWelcomeMessage ? (
        <div className="text-center p-5 mb-10" data-testid="notifications-empty-state">
          <img alt="Taco" src="https://trello.com/assets/ee2660df9335718b1a80.svg" />
          <h3>No unread notifications</h3>
        </div>
      ) : (
        <div className='px-11'>
          <div className='description-container rounded'>
            <div className='bg-primary h-auto p-3 rounded-top'>
              <div className='description-container bg-white h-auto p-5  rounded mb-3 '>
                <div>QWerqweqwe</div>
              </div>
              <span className='ms-4 text-light'><span className='fw-bolder text-white'>test:</span>Doing</span>
            </div>
            <div>
              <button className="btn pe-2">
                <img height="30" width="30" src="https://trello-members.s3.amazonaws.com/657c371033753894a11c8801/8308706128695d36c8af601394eafe73/170.png"
                  alt="NANDHA"
                  title="NANDHA"
                />
              </button>
              <strong role="button">Nandhagopan</strong>
              <div className="px-17 fw-light ">Moved to list To Do<span className="text-muted">&nbsp; 16 Apr at 10:42</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { HeaderNotificationsMenu };
