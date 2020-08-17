import React from 'react';
import './drop-zone.scss';
import { useDrop } from 'react-dnd';

function DropZone({name}) {
    const [_, drop] = useDrop({
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
    <div ref={node => drop(node)} className="col-drop-zone">
        {'Drop Zone Here'}
    </div>)
}

export default DropZone