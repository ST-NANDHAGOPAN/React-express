import React, { useState } from 'react'
import { Dropdown1 } from '../../partials/layout/sections/Dropdown1';
import { TbDots } from 'react-icons/tb';

const ListHeader = ({
    list,
    listIndex,
    setLists
}) => {
    const [editListIndex, setEditListIndex] = useState<number | null>(null);
    const [editedListName, setEditedListName] = useState<string>('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, listIndex: number) => {
        if (event.key === 'Enter') {
            if (editedListName.trim() !== '') {
                setLists(prevLists =>
                    prevLists.map((list, index) =>
                        index === listIndex ? { ...list, name: editedListName } : list
                    )
                );
            }
            setEditListIndex(null);
        }
    };
    return (
        <div>
            {editListIndex === listIndex ? (
                <div className='d-flex justify-content-between mb-2'>
                    <input
                        type="text"
                        className="form-control"
                        title='list name'
                        value={editedListName}
                        onChange={(event) => setEditedListName(event.target.value)}
                        onBlur={() => {
                            if (editedListName.trim() !== '') {
                                setLists(prevLists =>
                                    prevLists.map((list, index) =>
                                        index === listIndex ? { ...list, name: editedListName } : list
                                    )
                                );
                            }
                            setEditListIndex(null);
                        }}
                        onKeyDown={(event) => handleKeyPress(event, listIndex)}
                        autoFocus
                    />
                    <span className='cursor-pointer p-3'><TbDots /></span>
                </div>
            ) : (
                <div className='d-flex justify-content-between mb-2 '>
                    <h5
                        className="card-title"
                        onClick={() => {
                            setEditedListName(list.name);
                            setEditListIndex(listIndex);
                        }}
                    >
                        {list.name}
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