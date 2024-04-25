import React from 'react'
import Card from './Card';
import AddCard from './AddCard';
import ListHeader from './ListHeader';

const List = ({
    columns,
    column,
    columnIndex,
    setColumns,
}) => {
    return (
        <div>
            <div className="card me-5 addcolumn">
                <div className="card-body p-4 grey-color rounded ">
                    {/* List Header  */}
                    <ListHeader
                        columns={columns}
                        column={column}
                        columnIndex={columnIndex}
                        setColumns={setColumns}
                    />

                    {/* Card  */}
                    {column.tasks.map((task, taskIndex) => (
                        <Card
                            key={taskIndex}
                            task={task}
                        />
                    ))}

                    {/*  Add Card button */}
                    <AddCard
                        columns={columns}
                        columnIndex={columnIndex}
                        setColumns={setColumns}
                    />
                </div>
            </div>
        </div>
    )
}
export default List