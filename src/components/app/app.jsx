import React, { useState } from 'react';
import './app.scss';
import Column from '../column';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {
  const [columnData, setCardData] = useState([
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
    }
  ]);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className="col-container">  
          {renderColumns(columnData)}
        </div>



      </DndProvider>
    </div>
  );
}

function renderColumns(columnData) {
  return columnData.map(col => (<Column id={col.id} key={col.id} cards={col.cards} name={col.name} />));
}

export default App;
