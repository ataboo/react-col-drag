import React, {useRef} from 'react';
import './card.scss';
import {useDrag} from 'react-dnd';

export const Card = ({name, moveCard, id}) => {
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: "card" },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
              alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.4 : 1;

    return (<div className="drag-card" ref={node => drag(node)} style={{opacity, userSelect: "none"}}>
                {name}
            </div>);
};