import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { ImCross } from 'react-icons/im'
import { Addlabels } from '../../types/types';
import { useThemeMode } from '../../partials';

const AddList = ({ setLists }) => {
  const { mode } = useThemeMode();
  const [listNameInputs, setListNameInputs] = useState<string[]>(['']);
  const [showListNameInput, setShowListNameInput] = useState<boolean>(false);

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>, listIndex: number) => {
    const newInputs = [...listNameInputs];
    newInputs[listIndex] = event.target.value;
    setListNameInputs(newInputs);
  };

  const addList = () => {
    const newListName = listNameInputs[listNameInputs.length - 1];
    if (newListName.trim() !== '') {
      setLists((prev) => [...prev, { name: newListName.trim(), cards: [] }]);
      setListNameInputs([...listNameInputs, '']);
      setShowListNameInput(false);
    }
  };

  return (
    <div>
      <div className="list-container card">
        <div
          className={`card-body p-4 rounded ${mode === 'dark' ? 'bg-secondary' : 'grey-color'}`}>
          {showListNameInput ? (
            <div className=" mb-2 ">
              <input
                autoFocus
                type="text"
                title="List name"
                className="form-control p-4 mb-2"
                placeholder="Enter list title"
                value={listNameInputs[listNameInputs.length - 1]}
                onChange={(event) => handleListNameChange(event, listNameInputs.length - 1)}
              />
              <div className='d-flex mb-2'>
                <button onClick={addList} className='w-50 btn btn-primary text-center '>
                  {Addlabels.ADDLIST}</button>
                <span onClick={() => setShowListNameInput(false)} className='icon-red p-3' >
                  <ImCross />
                </span>
              </div>
            </div>
          )
            : (
              <button
                className={`${mode === 'dark' ? 'dark-add-list ' : 'light-add-list'}  p-5 rounded`}
                onClick={() => setShowListNameInput(true)}
              >
                <GoPlus className='me-1' />{Addlabels.ADDALIST}
              </button>
            )}
        </div>
      </div>
    </div>
  )
}

export default AddList