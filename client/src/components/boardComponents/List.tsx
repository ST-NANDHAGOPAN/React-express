import React from 'react'
import AddCard from './AddCard';
import ListHeader from './ListHeader';
import { useThemeMode } from '../../partials';
import Card from './Card';

const List = ({
    lists,
    list,
    listIndex,
    setLists
}) => {
    const { mode } = useThemeMode();
    return (
        <div>
            <div className="list-container card me-5 ">
                <div className={`card-body p-4 rounded 
                ${mode === 'dark' ? 'bg-secondary border-secondary  ' : 'grey-color'} `}>
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