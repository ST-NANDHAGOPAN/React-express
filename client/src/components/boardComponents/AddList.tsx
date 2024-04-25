import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { ImCross } from 'react-icons/im'

function AddList({
  columns,
  setColumns,
}) {
  const [columnNameInputs, setColumnNameInputs] = useState<string[]>(['']);
  const [showColumnNameInput, setShowColumnNameInput] = useState<boolean>(false);

  const handleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>, columnIndex: number) => {
    const newInputs = [...columnNameInputs];
    newInputs[columnIndex] = event.target.value;
    setColumnNameInputs(newInputs);
  };

  const addColumn = () => {
    const newColumnName = columnNameInputs[columnNameInputs.length - 1];
    if (newColumnName.trim() !== '') {
      setColumns([...columns, { name: newColumnName.trim(), tasks: [] }]);
      setColumnNameInputs([...columnNameInputs, '']);
      setShowColumnNameInput(false);
    }
  };

  return (
    <div>
      <div className="card addcolumn">
        <div className="card-body p-4  grey-color rounded">
          {showColumnNameInput ? (
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
                <button onClick={addColumn} className='w-50 btn btn-primary text-center '>
                  Add list</button>
                <span onClick={() => setShowColumnNameInput(false)} className='icon-red p-3' >
                  <ImCross />
                </span>
              </div>
            </div>
          )
            : (
              <button className='add-list p-5 rounded' onClick={() => setShowColumnNameInput(true)}>
                <GoPlus className='me-1' /> Add a list
              </button>
            )}
        </div>
      </div>
    </div>
  )
}

export default AddList