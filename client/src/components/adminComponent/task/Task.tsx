import React, { useState, useEffect } from 'react';
import "../../../assets/custom/task.css";
import { GoPlus } from "react-icons/go";
import { ImCross } from "react-icons/im";
import { TbDots } from "react-icons/tb";
import { MdEdit, MdOutlineRemoveRedEye, MdNotificationsActive } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";
import logo from "../../../assets/images/trello.png"
import { Dropdown1 } from '../../sections/Dropdown1';
import { Dropdown2 } from '../../sections/Dropdown2';

interface Column {
  name: string;
  tasks: { name: string }[];
}

function TrelloTask() {

  const [columns, setColumns] = useState<Column[]>([
    { name: 'To Do', tasks: [] },
    { name: 'In Progress', tasks: [] },
    { name: 'Done', tasks: [] }
  ]);

  const [columnNameInputs, setColumnNameInputs] = useState<string[]>(['']);
  const [taskNameInputs, setTaskNameInputs] = useState<string[]>(['']);
  const [showTaskInputs, setShowTaskInputs] = useState<boolean[]>([]);
  const [showColumnNameInput, setShowColumnNameInput] = useState<boolean>(false);
  const [editColumnIndex, setEditColumnIndex] = useState<number | null>(null);
  const [editedColumnName, setEditedColumnName] = useState<string>('');
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)

  useEffect(() => {
    // Initialize default task name inputs and show task inputs
    setTaskNameInputs(new Array(columns.length).fill(''));
    setShowTaskInputs(new Array(columns.length).fill(false));
  }, [columns]);

  const handleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>, columnIndex: number) => {
    const newInputs = [...columnNameInputs];
    newInputs[columnIndex] = event.target.value;
    setColumnNameInputs(newInputs);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>, columnIndex: number) => {
    const newInputs = [...taskNameInputs];
    newInputs[columnIndex] = event.target.value;
    setTaskNameInputs(newInputs);
  };

  const toggleTaskInputs = (columnIndex: number) => {
    const newShowTaskInputs = [...showTaskInputs];
    newShowTaskInputs[columnIndex] = true;
    setShowTaskInputs(newShowTaskInputs);
  };

  const handleAddTask = (columnIndex: number) => {
    const newTaskName = taskNameInputs[columnIndex].trim();
    if (newTaskName !== '') {
      const updatedColumns = [...columns];
      updatedColumns[columnIndex].tasks.push({ name: newTaskName });
      setColumns(updatedColumns);
      setTaskNameInputs([...taskNameInputs.slice(0, columnIndex), '', ...taskNameInputs.slice(columnIndex + 1)]);
      setShowTaskInputs([...showTaskInputs.slice(0, columnIndex), false, ...showTaskInputs.slice(columnIndex + 1)]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, columnIndex: number) => {
    if (event.key === 'Enter') {
      handleAddTask(columnIndex);
    }
  };

  const deleteTask = (columnIndex: number, taskIndex: number) => {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].tasks.splice(taskIndex, 1);
    setColumns(updatedColumns);
  };

  const addColumn = () => {
    const newColumnName = columnNameInputs[columnNameInputs.length - 1];
    if (newColumnName.trim() !== '') {
      setColumns([...columns, { name: newColumnName.trim(), tasks: [] }]);
      setColumnNameInputs([...columnNameInputs, '']);
      setTaskNameInputs([...taskNameInputs, '']);
      setShowTaskInputs([...showTaskInputs, false]);
      setShowColumnNameInput(false); // Hide input field after adding column
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, columnIndex: number) => {
    if (event.key === 'Enter') {
      if (editedColumnName.trim() !== '') {
        const updatedColumns = [...columns];
        updatedColumns[columnIndex].name = editedColumnName;
        setColumns(updatedColumns);
      }
      setEditColumnIndex(null);
    }
  };

  return (
    <div className="main">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex}>
          <div className="card me-5 addcolumn">
            <div className="card-body p-4 grey-color rounded">
              {/* List Header  */}
              {editColumnIndex === columnIndex ? (
                <div className='d-flex justify-content-between mb-2'>
                  <input
                    type="text"
                    className="form-control"
                    title='list name'
                    value={editedColumnName}
                    onChange={(event) => setEditedColumnName(event.target.value)}
                    onBlur={() => {
                      if (editedColumnName.trim() !== '') {
                        const updatedColumns = [...columns];
                        updatedColumns[columnIndex].name = editedColumnName;
                        setColumns(updatedColumns);
                      }
                      setEditColumnIndex(null);
                    }}
                    onKeyDown={(event) => handleKeyPress(event, columnIndex)}
                    autoFocus
                  />
                  <span className='cursor-pointer p-3'><TbDots /></span>
                </div>
              ) : (
                <div className='d-flex justify-content-between mb-2 '>
                  <h5
                    className="card-title"
                    onClick={() => {
                      setEditedColumnName(column.name);
                      setEditColumnIndex(columnIndex);
                    }}
                  >
                    {column.name}
                  </h5>
                  <span className='cursor-pointer' data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-start'><TbDots />
                  </span>
                  <Dropdown1 />

                </div>

              )}

              {/* Add Task  */}
              {column.tasks.map((task, taskIndex) => (
                <div
                  className={`card list-container mb-2 `}
                  key={taskIndex}
                >
                  <div>
                    <img
                      className='card-image border border-2  rounded-top  '
                      src={logo}
                      alt="qwe" />
                    <span className='cursor-pointer imagewithedit'  
                    onClick={() => setShowCreateAppModal(true)}><MdEdit />
                    </span>
                    <Dropdown2  show={showCreateAppModal} handleClose={() => setShowCreateAppModal(false)} />
                  </div>

                  <div className='d-flex flex-row justify-content-between p-2 '>
                    <h5 className="card-title">{task.name}</h5>
                    {/* <span className='cursor-pointer titlewithedit'><MdEdit /></span> */}
                  </div>

                  <div className='d-flex justify-content-around p-4'>
                    <span className='cursor-pointer text-warning fs-6 '>  <MdNotificationsActive /></span>
                    <span className='cursor-pointer fs-6 '><MdOutlineRemoveRedEye /></span>
                    <span className='cursor-pointer fs-6'><BsCardText /></span>
                    <span className='cursor-pointer fs-6'><FaRegComment /> 2</span>
                    <span className='cursor-pointer fs-6'> <RiAttachment2 /></span>
                  </div>
                </div>
              ))}

              {/*  Add List */}
              {showTaskInputs[columnIndex] && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      title="card name"
                      placeholder="Card Name"
                      value={taskNameInputs[columnIndex]}
                      onChange={(event) => handleTaskNameChange(event, columnIndex)}
                      onKeyDown={(event) => handleKeyDown(event, columnIndex)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={() => handleAddTask(columnIndex)}>Add card</button>
                  <span onClick={() => setShowTaskInputs(prevState => {
                    const newState = [...prevState];
                    newState[columnIndex] = false;
                    return newState;
                  })} className='icon-red p-3' >
                    <ImCross />
                  </span>
                </>
              )}
              {!showTaskInputs[columnIndex] && (
                <button className="add-list rounded p-5" onClick={() => toggleTaskInputs(columnIndex)}>
                  <GoPlus className='me-1' /> Add a card
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <div>
        <div className="card addcolumn">
          <div className="card-body p-4  grey-color rounded">
            {showColumnNameInput && (
              <div className=" mb-2 ">
                <input
                  autoFocus
                  type="text"
                  title="List name"
                  className="form-control p-4 mb-2"
                  placeholder="Enter list title"
                  value={columnNameInputs[columnNameInputs.length - 1]}
                  onChange={(event) => handleColumnNameChange(event, columnNameInputs.length - 1)}
                />
                <div className='d-flex mb-2'>
                  <button onClick={addColumn} className='w-50 btn btn-primary text-center '>Add list</button>
                  <span onClick={() => setShowColumnNameInput(false)} className='icon-red p-3' >
                    <ImCross />
                  </span>
                </div>
              </div>
            )}
            {!showColumnNameInput && (
              <button className='add-list p-5 rounded' onClick={() => setShowColumnNameInput(true)}>
                <GoPlus className='me-1' /> Add a list
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrelloTask;
