import React, { useState } from 'react';
import "../../assets/custom/task.css";
import List from '../../components/boardComponents/List';
import AddList from '../../components/boardComponents/AddList';
import { BasicList, ListItems } from '../../types/types';

const initialListItems: ListItems[] = [
  { name: BasicList.TODO, cards: [] },
  { name: BasicList.INPROGRESS, cards: [] },
  { name: BasicList.DONE, cards: [] }
];

const BoardPage = () => {
  const [lists, setLists] = useState<ListItems[]>(initialListItems);

  return (
    <div className="main">
      {lists.map((list, listIndex) => (
        <List
          key={listIndex}
          lists={lists}
          list={list}
          listIndex={listIndex}
          setLists={setLists}
        />
      )
      )}
      <AddList setLists={setLists} />
    </div>
  );
}

export default BoardPage;
