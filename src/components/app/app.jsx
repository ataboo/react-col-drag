import React, { useState } from 'react';
import './app.scss';
import Column from '../column';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import update from "immutability-helper";

function App() {
  const [columnData, setColData] = useState([
    {
      name: "column 1",
      id: "1",
      cards: [
        {
          id: "1",
          name: "card a"
        },
        {
          id: "2",
          name: "card b"
        }
      ]
    },
    {
      name: "column 2",
      id: "2",
      cards: [
        {
          id: "3",
          name: "card c"
        },
        {
          id: "4",
          name: "card d"
        }
      ]
    },
    {
      name: "column 3",
      id: "3",
      cards: []
    }
  ]);

  const moveCards = (draggedId, droppedId) => {
    let droppedCardIdx = -1;
    let droppedColIdx = -1;
    let draggedCardIdx = -1;
    let draggedColIdx = -1;
  
    for(let i=0; i<columnData.length; i++) {
      if (droppedColIdx < 0 || draggedColIdx < 0) {
        for(let j=0; j<columnData[i].cards.length; j++) {
          if (columnData[i].cards[j].id == droppedId) {
            droppedColIdx = i;
            droppedCardIdx = j;
            continue;
          }

          if (columnData[i].cards[j].id == draggedId) {
            draggedColIdx = i;
            draggedCardIdx = j;
            continue;
          }
        }
      }
    }

    if (droppedColIdx < 0 || draggedColIdx < 0) {
      console.error("Failed to get column");
      return;
    }

    console.log(`running move: drag: ${draggedId}|${draggedCardIdx}, drop: ${droppedId}|${droppedCardIdx}`);

    setColData((oldColData) => {
      var clone = [...oldColData];
      if (draggedColIdx != droppedColIdx) {
        let draggedCard = clone[draggedColIdx].cards.splice(draggedColIdx, 1)[0];
        clone[droppedColIdx].cards.splice(droppedColIdx, 0, draggedCard);
      } else {
        // console.log(`idx before: ${clone[draggedColIdx].cards[0].id}, ${clone[draggedColIdx].cards[1].id}`)

        let temp = clone[draggedColIdx].cards[draggedCardIdx];
        clone[draggedColIdx].cards[draggedCardIdx] = clone[draggedColIdx].cards[droppedCardIdx];
        clone[draggedColIdx].cards[droppedCardIdx] = temp;

        // console.log(`idx after: ${clone[draggedColIdx].cards[0].id}, ${clone[draggedColIdx].cards[1].id}`)
      }
      console.dir(clone[draggedColIdx].cards);

      return clone;
    });
  };

  const renderColumns = () => {
    return columnData.map(col => (<Column id={col.id} key={col.id} cards={col.cards} name={col.name} moveCards={moveCards} />));
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className="col-container">  
          {renderColumns()}
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
