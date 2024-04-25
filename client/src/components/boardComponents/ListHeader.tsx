import React, { useState } from 'react'
import { Dropdown1 } from '../../partials/layout/sections/Dropdown1';
import { TbDots } from 'react-icons/tb';

const ListHeader = ({
    columns,
    column,
    columnIndex,
    setColumns
}) =>{
    const [editColumnIndex, setEditColumnIndex] = useState<number | null>(null);
    const [editedColumnName, setEditedColumnName] = useState<string>('');
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
        <div>
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
        </div>
    )
}

export default ListHeader