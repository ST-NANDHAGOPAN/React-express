import React, { useState } from 'react';
import "../../assets/custom/task.css";
import List from './List';
import AddList from './AddList';


interface Column {
  name: string;
  tasks: { name: string }[];
}
const initialColumns: Column[] = [
  { name: 'To Do', tasks: [] },
  { name: 'In Progress', tasks: [] },
  { name: 'Done', tasks: [] }
];

function TrelloTask() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  return (
    <div className="main">
      {columns.map((column, columnIndex) => (
        <List
          key={columnIndex}
          columns={columns}
          column={column}
          columnIndex={columnIndex}
          setColumns={setColumns}
        />
      )
      )}
      <AddList
        columns={columns}
        setColumns={setColumns}
      />
    </div>
  );
}

export default TrelloTask;
