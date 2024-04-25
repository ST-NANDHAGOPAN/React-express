import React from 'react'
import Card from './Card';
import AddCard from './AddCard';
import ListHeader from './ListHeader';

const List = ({
    lists,
    list,
    listIndex,
    setLists
}) => {
  
    return (
        <div>
            <div className="card me-5 addcolumn">
                <div className="card-body p-4 grey-color rounded ">
                    {/* List Header  */}
                    <ListHeader
                        list={list}
                        listIndex={listIndex}
                        setLists={setLists}
                    />

                    {/* Card  */}
                    {list.cards.map((card, cardIndex) => (
                        <Card
                            key={cardIndex}
                            card={card}
                        />
                    ))}

                    {/*  Add Card button */}
                    <AddCard
                        lists={lists}
                        listIndex={listIndex}
                        setLists={setLists}
                    />
                </div>
            </div>
        </div>
    )
}
export default List