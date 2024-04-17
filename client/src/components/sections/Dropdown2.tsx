import { Modal } from "react-bootstrap";
import { KTIcon } from "../../helpers";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaWindowMaximize } from "react-icons/fa";
import "../../assets/custom/Dropdown.css"
type Props = {
    show: boolean;
    handleClose: () => void;
};

const Dropdown2 = ({ show, handleClose }: Props) => {
    return (
        <Modal
            id="kt_modal_create_app"
            tabIndex={-1}
            aria-hidden="true"
            dialogClassName="modal-dialog modal-dialog-centered " // Maintain centering
            show={show}
            onHide={handleClose}
            backdrop={true}
            size="lg"

        >
            <div className="modal-header">
                <h2>Card</h2>
                <div
                    className="btn btn-sm btn-icon btn-active-color-primary"
                    onClick={handleClose}
                >
                    <KTIcon className="fs-1" iconName="cross" />
                </div>
            </div>
            <div className="modal-body py-lg-10 px-lg-10">
                <div className="popup-header">
                    <span className='cursor-pointer popup-header-icon fs-6 '>
                        <FaWindowMaximize /></span>
                    <div className="window-title px-8">
                        <h2>
                            qwewqewqr
                        </h2>
                        <p className="lh-0">in list Doing
                            <span className='cursor-pointer fs-6 '><MdOutlineRemoveRedEye />
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export { Dropdown2 };
