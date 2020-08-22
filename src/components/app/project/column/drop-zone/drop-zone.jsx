import React from 'react';
import './drop-zone.scss';

export function DropZone({status, moveCardToStatus, draggedCardId}) {
    const onDragOver = (event) => {
        moveCardToStatus(draggedCardId, status.id)
    };

    return (
    <div className="col-drop-zone"
        onDragOver={onDragOver}>
        {'Drop Zone Here'}
    </div>)
}