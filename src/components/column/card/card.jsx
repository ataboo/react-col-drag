import React from 'react';
import './card.scss';

export const Card = ({name, id, statusId, ordinal, moveCards}) => {
    //until dragend event is fixed in firefox
    const getOpacity = () => localStorage.getItem("draggedCardId") === id ? 0.2 : 1;
    const elementRef = React.useRef(null);
    
    function onDragStart(event, {id}) {
        elementRef.current.addEventListener('dragend', onDragEnd, false);
        event.dataTransfer.dropEffect = 'move';

        localStorage.setItem('draggedCardId', id);
    }

    function onDragHover(event) {
        let cardId = localStorage.getItem('draggedCardId');
        if (cardId !== id) {
            moveCards(cardId, statusId, ordinal);
        }

        event.preventDefault();
    }

    function onDragEnd(event) {
        if(elementRef.current) {
            elementRef.current.removeEventListener('dragend', onDragEnd, false);
        }
    }

    return (<div 
                ref={elementRef}
                className="drag-card draggable"
                onDragStart = {(event) => onDragStart(event, {id: id})}
                draggable
                onDragOver={(event)=>onDragHover(event)}
                style={{getOpacity, userSelect: "none"}}
            >
                {name} - {ordinal}
            </div>);
};