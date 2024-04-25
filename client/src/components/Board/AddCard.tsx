import React, { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go';
import { ImCross } from 'react-icons/im';

function AddCard({
    columns,
    columnIndex,
    setColumns,
}) {
    const [taskNameInputs, setTaskNameInputs] = useState<string[]>(['']);
    const [showTaskInputs, setShowTaskInputs] = useState<boolean[]>([]);

    useEffect(() => {
        setTaskNameInputs(new Array(columns.length).fill(''));
        setShowTaskInputs(new Array(columns.length).fill(false));
    }, [columns]);

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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, columnIndex: number) => {
        if (event.key === 'Enter') {
            handleAddTask(columnIndex);
        }
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

    return (
        <>
            {showTaskInputs[columnIndex] ? (
                <div>
                    <div className="mb-3">
                        <input
                            autoFocus
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
                </div>
            ) :
                (
                    <button className="add-list rounded p-5" onClick={() => toggleTaskInputs(columnIndex)}>
                        <GoPlus className='me-1' /> Add a card
                    </button>
                )}
        </>
    )
}

export default AddCard