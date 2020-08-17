import React, {useRef} from 'react';
import './column.scss';
import { Card } from './card';
import DropZone from './drop-zone/drop-zone';
import { useDrop } from 'react-dnd';

const renderCards = (cards, name, moveCards) => {
    if (cards.length == 0) {
        return (<DropZone name={name + " dropzone"}/>)
    }

    return cards.map(c => (<Card key={c.id} id={c.id} name={c.name} moveCards={moveCards}/>))
};

function Column({cards, name, moveCards}) {
    const [, drop] = useDrop({ accept: 'card' })
    return (
    <div ref={drop} className="drag-column" style={{background: 'blue'}}>
        <div>{name} - {cards.length}</div>
        {renderCards(cards, name, moveCards)}
    </div>)
}

export default Column