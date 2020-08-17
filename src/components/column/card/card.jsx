import React, {useRef} from 'react';
import './card.scss';
import {useDrag, useDrop} from 'react-dnd';

export const Card = ({name, id, moveCards}) => {
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: "card", id: id },
        // end: (item, monitor) => {
        //     const dropResult = monitor.getDropResult()
        //     // if (item && dropResult) {
        //     //   alert(`You dropped ${item.name} into ${dropResult.name}!`)
        //     // }
        // },
        end: (dropResult, monitor) => {
            const { id: droppedId, originalIndex } = monitor.getItem()
            const didDrop = monitor.didDrop()
            if (!didDrop) {
              moveCards(droppedId, id)
            }
        },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const[_, drop] = useDrop({
        accept: "card",
        canDrop: () => false,
        drop: () => ({id: id, name: name}),
        hover({id: draggedId}){
            if (draggedId != id) {
                moveCards(draggedId, id);
            }
        }
    })

    const opacity = isDragging ? 0.4 : 1;

    return (<div className="drag-card" ref={node => drop(drag(node))} style={{opacity, userSelect: "none"}}>
                {name}
            </div>);
};