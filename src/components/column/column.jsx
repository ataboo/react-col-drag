import React, {useRef} from 'react';
import './column.scss';
import { Card } from './card';
import { useDrop } from 'react-dnd';

const renderCards = (cards) => cards.map(c => (<Card key={c.id} id={c.id} name={c.name} moveCards={moveCards}/>));

const moveCards = (dragged, dropped) => {
    console.log("Dragging "+dragged.key+" to "+dropped.key);
};

function Column({cards, name, id}) {
    const [{isOver, canDrop}, drop] = useDrop({
        accept: "card",
        drop: () => ({name: name}),
        // hover: (item, monitor) => {
        //     if(!ref.current) {
        //         return;
        //     }

        //     isOver = monitor.isOver()
        // }
        // hover: (item, monitor) => {
        //     if (!ref.current) {
        //         return
        //     }
            
        //     console.log(item.key);
        // }
        // collect: (monitor) => ({
        //     isOver: monitor.isOver(),
        //     canDrop: monitor.canDrop()
        // })
    })

    return (
    <div ref={node => drop(node)} className="drag-column" style={isOver ? {background: 'green'} : {background: 'red'}}>
        <div>{name}</div>
        {renderCards(cards)}
    </div>)
}

export default Column