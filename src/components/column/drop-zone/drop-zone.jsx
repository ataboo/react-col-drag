import React from 'react';
import './drop-zone.scss';

function DropZone({status, moveCardToStatus}) {
    const onDragOver = (event) => {
        let cardId = localStorage.getItem('draggedCardId');
        moveCardToStatus(cardId, status.id)
    };

    return (
    <div className="col-drop-zone"
        onDragOver={onDragOver}>
        {'Drop Zone Here'}
    </div>)
}

export default DropZone