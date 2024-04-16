import React from 'react'
import logo from "../../assets/images/custom-1.png"
import { IoIosLock } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import "../../assets/custom/workspace.css";

function Workspace() {
  return (
    <div className='workspace'>
      <div className="d-flex justify-content-around ">
        <div className='d-flex'>
          <img
            className='workspacelogo me-3 '
            src={logo}
            alt="qwe" />
          <div>
            <h2 className="logoheader">Bart Team <MdEdit /> </h2>
            <p className='fs-4 '><IoIosLock className='fs-4 me-1 ' />Private</p>
          </div>
        </div>
        <div>
          <button className="btn btn-primary" type="button">
            <FaPlusCircle className='me-1 fw-bold ' /> Add Workspace members
          </button>
        </div>
      </div>
      <hr />
      <div className='menu-item'>
        <div className='menu-content pt-2 pb-2'>
          <span className='menu-section fw-bolder text-uppercase fs-8 ls-1 '>Your Boards</span>
          <div className="card-container  my-8 ">
            <div className="board bg-primary">NYU Seating</div>
            <div className="board bg-success">New Mom School</div>
            <div className="board bg-danger">Check Issuing </div>
            <div className="board"> <FaPlusCircle className='me-1 fw-bold ' />Create a Board</div>
          </div>
        </div>
      </div>
      <hr />
      <div className='menu-item'>
        <div className='menu-content pt-2 pb-2'>
          <span className='menu-section fw-bolder text-uppercase fs-8 ls-1 '>ALl Workspaces</span>
          <div className="card-container  my-8 ">
          <div className="board bg-primary">Bart Team</div>
            <div className="board bg-success">Eyeball</div>
            <div className="board bg-danger">TM THrive</div>
            <div className="board"> <FaPlusCircle className='me-1 fw-bold ' />Create a Workspace</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace