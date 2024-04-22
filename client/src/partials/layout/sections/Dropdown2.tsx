import "../../../assets/custom/Dropdown.css"
import { MdOutlineAddReaction, MdOutlineArchive, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaWindowMaximize } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { BsCardText, BsDot } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { FcRightUp } from "react-icons/fc";
import { MdOutlineCreditCard } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { IoMdCheckboxOutline, IoMdPerson } from "react-icons/io";
import { IoCopy, IoTicket } from "react-icons/io5";
import { LuMoveRight } from "react-icons/lu";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";

type Props = {
    show: boolean;
    handleClose: () => void;
};

const Dropdown2 = ({ show, handleClose }: Props) => {
    return (
        <>
            <div className="modal-header card-model-header p-0">
                <img className="card-cover-img  rounded-top" src={`${toAbsoluteUrl('/media/misc/menu-header-bg.jpg')}`}
                    alt="trello"
                    title="trello"
                />

                <div
                    className="cross-button btn btn-sm btn-icon btn-color-dark  btn-active-color-light"
                    onClick={handleClose}
                >
                    <KTIcon className="fs-1" iconName="cross" />
                </div>
            </div>
            <div className="modal-body py-lg-10 px-lg-10">
                <div className="popup-header ">
                    <span className='cursor-pointer popup-header-icon  '>
                        <FaWindowMaximize /></span>
                    <div className="px-11">
                        <h2>
                            qwewqewqr
                        </h2>
                        <p className="lh-0 ">in list
                            <span className="ms-1 text-primary">Doing</span>
                            <span className='cursor-pointer fs-6 ms-3'><MdOutlineRemoveRedEye />
                            </span>
                        </p>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9 p-0">
                            <div className="d-flex my-12">
                                <div className="px-10">
                                    <h3>Members</h3>
                                    <div>
                                        <button className="btn p-0">
                                            <img height="30" width="30" src="https://trello-members.s3.amazonaws.com/64ff3b85fb96de6dfd2019d8/c022d8dcf71ccf540f557ec9a1ea203f/30.png"
                                                alt="Harikrishnan"
                                                title="Harikrishnan" />
                                        </button>
                                        <button className="btn p-0 ms-1">
                                            <img height="30" width="30" src="https://trello-members.s3.amazonaws.com/657c36ea2f47260a413da144/2418a823d05944d358c04043c2df5a40/30.png"
                                                alt="surya"
                                                title="surya"
                                            />
                                        </button>
                                        <button className="btn p-0 ms-1">{""}
                                            <span className='cursor-pointer addmembers'><GoPlus />
                                            </span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="popup-header mb-8">
                                <span className='cursor-pointer popup-header-icon '>
                                    <BsCardText /></span>
                                <div className="px-11">
                                    <div className='d-flex flex-row justify-content-between mb-3 '>
                                        <h2 >Description</h2>
                                        <span className='btn btn-secondary text-center p-2 px-3 '> Edit</span>
                                    </div>
                                    <div >
                                        <textarea
                                            className="description-container"
                                            title="vcb">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="popup-header mb-8">
                                <span className='cursor-pointer popup-header-icon '>
                                    <RiAttachment2 />
                                </span>

                                <div className="px-11">
                                    <div className='d-flex flex-row justify-content-between mb-3 '>
                                        <h2 >Attachement</h2>
                                        <span className='btn btn-secondary text-center p-2 px-3   '> Add</span>
                                    </div>
                                    <div className="attachement-container">
                                        <div>
                                            <div className="d-flex">
                                                <img
                                                    className="rounded"
                                                    height="100"
                                                    width="100"
                                                    src={`${toAbsoluteUrl('/media/misc/menu-header-bg.jpg')}`}
                                                    alt="trello"
                                                    title="trello"
                                                />
                                                <p className="ms-2">
                                                    <span className="cursor-pointer">board.png <FcRightUp />
                                                    </span>
                                                    <a href="https://trello.com/1/cards/661924d24e3056ff806b1c07/attachments/661f9fad4fa4ac221cbf3991/download/board.png" title="board.png">
                                                        <span></span>
                                                    </a>
                                                    <span className="d-block mb-3">
                                                        <span title="17 April 2024 15:38">
                                                            Added 13 a minute ago <BsDot />

                                                        </span>
                                                        <span>
                                                            <a
                                                                className="text-decoration-underline"
                                                                href="/">
                                                                <span>Download
                                                                </span>
                                                            </a>
                                                        </span>
                                                        <span> <BsDot /></span>
                                                        <span>
                                                            <a
                                                                className="text-decoration-underline"
                                                                href="/">
                                                                <span>Delete</span>
                                                            </a>
                                                        </span>
                                                    </span>
                                                    <span>
                                                        <a
                                                            className="text-decoration-underline"
                                                            href="/">
                                                            <span><MdOutlineCreditCard className="me-2" />
                                                                Remove cover
                                                            </span>
                                                        </a>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="popup-header mb-8">
                                <span className='cursor-pointer popup-header-icon '>
                                    <RxActivityLog />
                                </span>
                                <div className="px-11">
                                    <div className='d-flex flex-row 
                                    justify-content-between mb-3 '>
                                        <h2 >Activity</h2>
                                        <span className='btn btn-secondary text-center p-2 px-3  '> Show Details</span>
                                    </div>

                                </div>
                                <div className="activity-container">
                                    <div className="d-flex">
                                        <button className="btn p-0 me-2 ">
                                            <img height="30" width="30" src="https://trello-members.s3.amazonaws.com/657c371033753894a11c8801/8308706128695d36c8af601394eafe73/170.png"
                                                alt="NANDHA"
                                                title="NANDHA"
                                            />
                                        </button>
                                        <div className="pe-11 w-100">
                                            <input
                                                className="description-container h-auto p-2"
                                                type="text"
                                                placeholder="Write a comment…"
                                                title="Write a comment" />
                                        </div>
                                    </div>
                                    <div className="mt-4" >
                                        <div className="d-flex ">
                                            <div>
                                                <button className="btn p-0  me-2 ">
                                                    <img height="30" width="30" src="https://trello-members.s3.amazonaws.com/657c36ea2f47260a413da144/2418a823d05944d358c04043c2df5a40/30.png"
                                                        alt="SURYA"
                                                        title="SURYA"
                                                    />
                                                </button>
                                            </div>
                                            <div className="lh-lg">
                                                <span className="fw-bolder fs-6 me-3">Surya</span>
                                                <a className="cursor-pointer dateview" href="/" title="18 January 2024 12:11">18 Jan at 12:11 </a>
                                                <span>(edited)</span>
                                            </div>
                                        </div>
                                        <div className="px-11">
                                            <div
                                                className="description-container h-auto"
                                                title="vcb">
                                                <p>
                                                    <img
                                                        className="mt-4 ms-4"
                                                        height="100"
                                                        width="100"
                                                        src="https://trello.com/1/cards/661e3aa2f165ddead3a1b452/attachments/661e3abad09bb95209afd781/download/trello.png" alt="trello.png" />
                                                </p>
                                                <p className="px-2">Task Completed. Kindly check this PR
                                                    <a href="/" className="cursor-pointer text-decoration-underline ms-4">https://github.com/ </a></p>
                                            </div>
                                            <div>
                                                <span><MdOutlineAddReaction /> <BsDot /></span>
                                                <span>
                                                    <a
                                                        className="text-decoration-underline"
                                                        href="/">
                                                        <span>Edit</span>
                                                    </a>
                                                </span>
                                                <span> <BsDot /></span>
                                                <span>
                                                    <a
                                                        className="text-decoration-underline"
                                                        href="/">
                                                        <span>Delete</span>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-3">
                            <div className="mb-12">
                                <h3 className="mb-3">Add to card</h3>
                                <div>
                                    <button className='text-start btn btn-secondary rounded w-100 mb-2'>
                                        <IoMdPerson className='me-1' />Member
                                    </button>
                                    <button className='text-start btn btn-secondary rounded w-100 mb-2'>
                                        <IoTicket className='me-1' />Labels
                                    </button>
                                    <button className='text-start btn btn-secondary rounded w-100 mb-2'>
                                        <IoMdCheckboxOutline className='me-1' />CheckList
                                    </button>
                                    <button className='text-start btn btn-secondary rounded w-100 mb-2'>
                                        <RiAttachment2 className='me-1' />Attachement
                                    </button>

                                </div>
                            </div>
                            <div>
                                <h3>Actions</h3>
                                <div>
                                    <button className='text-start btn btn-secondary rounded w-100 mb-2'>
                                        <LuMoveRight className='me-1' />Move
                                    </button>
                                    <button className='text-start btn btn-secondary rounded w-100 mb-2'>
                                        <IoCopy className='me-1' />Copy
                                    </button>
                                    <button className='text-start btn btn-secondary rounded w-100 mb-2'>
                                        <MdOutlineArchive className='me-1' />Archive
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export { Dropdown2 };
