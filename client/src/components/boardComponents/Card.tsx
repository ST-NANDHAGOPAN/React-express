import React, { useState } from 'react'
import { BsCardText } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'
import { MdEdit, MdNotificationsActive, MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiAttachment2 } from 'react-icons/ri'
import { toAbsoluteUrl } from '../../helpers'
import { Modal } from 'react-bootstrap'
import { Dropdown2 } from '../../partials/layout/sections/Dropdown2'

const Card = ({ card }) => {
    const [showCreateCardModal, setShowCreateCardModal] = useState<boolean>(false)

    return (
        <div
            className={`card card-container mb-2 `}
        >
            <div>
                <img
                    className='card-image border border-2  rounded-top  '
                    src={`${toAbsoluteUrl('/media/misc/menu-header-bg.jpg')}`}
                    alt="qwe" />
                <span className='cursor-pointer imagewithedit '
                    onClick={() => setShowCreateCardModal(true)}><MdEdit />
                </span>

            </div>

            <div className='d-flex flex-row justify-content-between p-2 '>
                <h5 className="card-title">{card.name}</h5>
                {/* <span className='cursor-pointer titlewithedit'><MdEdit /></span> */}
            </div>

            <div className='d-flex justify-content-around p-4'>
                <span className='cursor-pointer text-warning fs-6 '>  <MdNotificationsActive /></span>
                <span className='cursor-pointer fs-6 '><MdOutlineRemoveRedEye /></span>
                <span className='cursor-pointer fs-6'><BsCardText /></span>
                <span className='cursor-pointer fs-6'><FaRegComment /> 2</span>
                <span className='cursor-pointer fs-6'> <RiAttachment2 /></span>
            </div>
            <Modal
                tabIndex={-1}
                aria-hidden="true"
                dialogClassName="modal-dialog-centered"
                show={showCreateCardModal}
                backdrop={true}
                size="lg">
                <Dropdown2 handleClose={() => setShowCreateCardModal(false)} />
            </Modal>
        </div>
    )
}

export default Card