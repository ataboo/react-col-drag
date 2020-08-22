import React from 'react';
import './column.scss';
import { Card } from './card';
import { DropZone } from './drop-zone';


export function Column({cards, status, moveCards, moveCardToStatus, draggedCardId, setDraggedCardId}) {
    const renderCards = () => {
        if (cards.length === 0) {
            return (<DropZone status={status} moveCardToStatus={moveCardToStatus} draggedCardId={draggedCardId}/>)
        }
    
        return cards.map(c => (<Card 
            key={c.id} 
            id={c.id} 
            name={c.name} 
            statusId={c.statusId} 
            ordinal={c.ordinal} 
            moveCards={moveCards}
            draggedCardId={draggedCardId}
            setDraggedCardId={setDraggedCardId}
        />))    
    }

    return (
    <div 
        className="drag-column droppable" 
        style={{background: 'blue'}}
    >
        <div>{status.name} - {cards.length}</div>
        {renderCards()}
    </div>)
};