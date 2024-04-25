import React, { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go';
import { ImCross } from 'react-icons/im';
import { Addlabels } from '../../types/types';

const AddCard = ({
    lists,
    listIndex,
    setLists,
}) => {
    const [cardNameInputs, setCardNameInputs] = useState<string[]>(['']);
    const [showCardInputs, setShowCardInputs] = useState<boolean[]>([]);

    useEffect(() => {
        setCardNameInputs(new Array(lists.length).fill(''));
        setShowCardInputs(new Array(lists.length).fill(false));
    }, [lists]);

    const handleCardNameChange = (event: React.ChangeEvent<HTMLInputElement>, listIndex: number) => {
        const newInputs = [...cardNameInputs];
        newInputs[listIndex] = event.target.value;
        setCardNameInputs(newInputs);
    };

    const toggleCardInputs = (listIndex: number) => {
        const newShowTaskInputs = [...showCardInputs];
        newShowTaskInputs[listIndex] = true;
        setShowCardInputs(newShowTaskInputs);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, listIndex: number) => {
        if (event.key === 'Enter') {
            handleAddCard(listIndex);
        }
    };

    const handleAddCard = (listIndex: number) => {
        const newTaskName = cardNameInputs[listIndex].trim();
        if (newTaskName !== '') {
            setLists(prevLists => 
                prevLists.map((list, index) => 
                    index === listIndex ? { ...list, cards: [...list.cards, { name: newTaskName }] } : list
                )
            );
            setCardNameInputs([...cardNameInputs.slice(0, listIndex), '', ...cardNameInputs.slice(listIndex + 1)]);
            setShowCardInputs([...showCardInputs.slice(0, listIndex), false, ...showCardInputs.slice(listIndex + 1)]);
        }
    };

    return (
        <>
            {showCardInputs[listIndex] ? (
                <div>
                    <div className="mb-3">
                        <input
                            autoFocus
                            type="text"
                            className="form-control"
                            title="card name"
                            placeholder="Card Name"
                            value={cardNameInputs[listIndex]}
                            onChange={(event) => handleCardNameChange(event, listIndex)}
                            onKeyDown={(event) => handleKeyDown(event, listIndex)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={() => handleAddCard(listIndex)}> {Addlabels.ADDCARD}</button>
                    <span onClick={() => setShowCardInputs(prevState => {
                        const newState = [...prevState];
                        newState[listIndex] = false;
                        return newState;
                    })} className='icon-red p-3' >
                        <ImCross />
                    </span>
                </div>
            ) :
                (
                    <button className="add-list rounded p-5" onClick={() => toggleCardInputs(listIndex)}>
                        <GoPlus className='me-1' />{Addlabels.ADDACARD}
                    </button>
                )}
        </>
    )
}

export default AddCard