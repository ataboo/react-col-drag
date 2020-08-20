import React, { useState } from 'react';
import './app.scss';
import Column from '../column';
import CardService from '../../service/card-service';

function App() {
  const [cardData, setCardData] = useState({
    cards: [
      {
        id: "1",
        name: "card a",
        statusId: "1",
        ordinal: 0
      },
      {
        id: "2",
        name: "card b",
        statusId: "1",
        ordinal: 1
      },
      {
        id: "3",
        name: "card c",
        statusId: "2",
        ordinal: 0
      },
      {
        id: "4",
        name: "card d",
        statusId: "2",
        ordinal: 1
      },
      {
        id: "5",
        name: "card e",
        statusId: "2",
        ordinal: 2
      },
      {
        id: "6",
        name: "card f",
        statusId: "2",
        ordinal: 3
      }
    ],
    statuses: [
      {
        id: "1",
        name: "back-burner"
      },
      {
        id: "2",
        name: "front-burner"
      }
    ]
  });

  const moveCardToStatus = (draggedId, statusId) => {
    setCardData((oldCardData) => {
      CardService.moveCardToStatus(oldCardData, draggedId, statusId)

      return {
        cards: [...oldCardData.cards],
        statuses: [...oldCardData.statuses]
      };
    })
  }

  const moveCards = (draggedId, statusId, ordinal) => {
    setCardData((oldCardData) => {
      CardService.swapCards(oldCardData, draggedId, statusId, ordinal)

      return {
        cards: [...oldCardData.cards],
        statuses: [...oldCardData.statuses]
      };
    });
  };

  const renderColumns = () => {
    let sortedCards = (statusId) => cardData.cards.filter(c => c.statusId === statusId).sort((a, b) => a.ordinal - b.ordinal);

    return cardData.statuses.map((status, i) => (<Column 
      key={status.id} 
      cards={sortedCards(status.id)} 
      status={status} 
      moveCards={moveCards} 
      moveCardToStatus={moveCardToStatus}
    />))

  }

  return (
    <div className="App">
        <div className="col-container">  
          {renderColumns()}
        </div>
    </div>
  );
}

export default App;
