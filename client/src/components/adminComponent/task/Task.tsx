import React, { useState } from 'react';
import "../../../assets/custom/task.css";

function TrelloTask() {
    const [columns, setColumns] = useState<Array<{ name: string, tasks: { name: string }[] }>>([]);
    const [columnNameInputs, setColumnNameInputs] = useState<string[]>(['']);
    const [taskNameInputs, setTaskNameInputs] = useState<string[]>(['']);
    const [showTaskInputs, setShowTaskInputs] = useState<boolean[]>([]);

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
        }
    };

    return (
        <div className="container">
            <div className="row mb-3 addcolumn">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Column Name"
                        value={columnNameInputs[columnNameInputs.length - 1]}
                        onChange={(event) => handleColumnNameChange(event, columnNameInputs.length - 1)}
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={addColumn}>Add Column</button>
                </div>
            </div>
            <div className="card-columns d-flex">
                {columns.map((column, columnIndex) => (
                    <div className="card d" key={columnIndex}>
                        <div className="card-body">
                            <h5 className="card-title">{column.name}</h5>
                            {column.tasks.map((task, taskIndex) => (
                                <div className="card mb-2" key={taskIndex}>
                                    <div className="card-body">
                                        <h5 className="card-title">{task.name}</h5>
                                        <button className="btn btn-danger" onClick={() => deleteTask(columnIndex, taskIndex)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                            {showTaskInputs[columnIndex] && (
                                <>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Task Name"
                                            value={taskNameInputs[columnIndex]}
                                            onChange={(event) => handleTaskNameChange(event, columnIndex)}
                                            onKeyDown={(event) => handleKeyDown(event, columnIndex)}
                                        />
                                    </div>
                                    <button className="btn btn-primary mb-3" onClick={() => handleAddTask(columnIndex)}>Add Task</button>
                                </>
                            )}
                            {!showTaskInputs[columnIndex] && (
                                <button className="btn btn-primary mb-3" onClick={() => toggleTaskInputs(columnIndex)}>Add Task</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrelloTask;
