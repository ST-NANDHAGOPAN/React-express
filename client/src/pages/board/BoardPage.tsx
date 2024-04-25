import React, { useState } from 'react';
import "../../assets/custom/task.css";
import List from '../../components/boardComponents/List';
import AddList from '../../components/boardComponents/AddList';
import { BasicList, ListItems } from '../../types/types';

const initialListItems: ListItems[] = [
  { name: BasicList.TODO, tasks: [] },
  { name: BasicList.INPROGRESS, tasks: [] },
  { name: BasicList.DONE, tasks: [] }
];

const BoardPage = () => {
  const [columns, setColumns] = useState<ListItems[]>(initialListItems);

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
      <AddList setColumns={setColumns} />
    </div>
  );
}

export default BoardPage;
