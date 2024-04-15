import React, { useState } from 'react';
import "../../../assets/custom/task.css";
import { GoPlus } from "react-icons/go";
import { ImCross } from "react-icons/im";
import { TbDots } from "react-icons/tb";
import { MdEdit } from "react-icons/md";

function TrelloTask() {
  const [columns, setColumns] = useState<Array<{ name: string, tasks: { name: string }[] }>>([]);
  const [columnNameInputs, setColumnNameInputs] = useState<string[]>(['']);
  const [taskNameInputs, setTaskNameInputs] = useState<string[]>(['']);
  const [showTaskInputs, setShowTaskInputs] = useState<boolean[]>([]);
  const [showColumnNameInput, setShowColumnNameInput] = useState<boolean>(false);
  const [editColumnIndex, setEditColumnIndex] = useState<number | null>(null);
  const [editedColumnName, setEditedColumnName] = useState<string>('');

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
    <div className="container">
      {columns.map((column, columnIndex) => (
        <div className='main'>
          <div className="card me-5 addcolumn" key={columnIndex}>
            <div className="card-body p-4 " key={columnIndex}>
              {editColumnIndex === columnIndex ? (
                <div className='d-flex justify-content-between mb-2' key={columnIndex}>
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
                <div className='d-flex justify-content-between mb-2'>
                  <h5
                    className="card-title"
                    onClick={() => {
                      setEditedColumnName(column.name);
                      setEditColumnIndex(columnIndex);
                    }}
                  >
                    {column.name}
                  </h5>
                  <span className='cursor-pointer'><TbDots /></span>
                </div>

              )}

              {column.tasks.map((task, taskIndex) => (
                <div className="card d-flex flex-row justify-content-between mb-2 pt-2 px-2" key={taskIndex}>
                    <h5 className="card-title">{task.name}</h5>
                    <span className='cursor-pointer'><MdEdit /></span>
                </div>
              ))}

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
                <button className="add-list p-5" onClick={() => toggleTaskInputs(columnIndex)}>
                  <GoPlus className='me-1' /> Add a card
                </button>

              )}
            </div>
          </div>
        </div>
      ))}
      <div>
        <div className="card addcolumn">
          <div className="card-body p-4">
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
              <button className='add-list p-5' onClick={() => setShowColumnNameInput(true)}>
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
