const swapCards = (cardData, draggedCardId, droppedCardStatusId, droppedCardOrdinal) => {
    let draggedCard = cardData.cards.find(c => c.id === draggedCardId);
    let newColumnCards = cardData.cards.filter(c => c.statusId === droppedCardStatusId && c.id !== draggedCardId);
    newColumnCards.sort((a, b) => a.ordinal - b.ordinal);

    if (draggedCard.statusId === droppedCardStatusId) {
        let droppedCard = newColumnCards.find(c => c.ordinal === droppedCardOrdinal);
        if (droppedCard !== undefined) {
            droppedCard.ordinal = draggedCard.ordinal;
        }
    } else {   
        let oldColumnCards = cardData.cards.filter(c => c.statusId === draggedCard.statusId && c.id !== draggedCardId);
        oldColumnCards.sort((a, b) => a.ordinal - b.ordinal);
        for(let i=droppedCardOrdinal; i<newColumnCards.length; i++) {
            newColumnCards[i].ordinal = i+1;
        }

        for(let i=0; i<oldColumnCards.length; i++) {
            oldColumnCards[i].ordinal = i; 
        }
    }

    draggedCard.ordinal = droppedCardOrdinal;
    draggedCard.statusId = droppedCardStatusId;
};

const moveCardToStatus = (cardData, draggedCardId, status) => {
    let draggedCard = cardData.cards.find(c => c.id === draggedCardId);
    if(draggedCard.statusId !== status) {
        var oldColumnCards = cardData.cards.filter(c => c.statusId === draggedCard.statusId && c.id !== draggedCardId);

        for(let i=0; i<oldColumnCards.length; i++) {
            oldColumnCards.ordinal = i;
        }

        draggedCard.statusId = status;
        draggedCard.ordinal = 0;
    }
}

const loadCards = async () => {
    const response = await fetch("localhost:8080/api/v1/getcards", {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'error',
        referrerPolicy: 'no-referrer'
    });

    return response.json();
};

const syncCards = async (cardData) => {
    const response = await fetch("localhose:8080/api/v1/synccards", {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'error',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(cardData)
    });

    return response.json();
};

export default {
    swapCards,
    moveCardToStatus,
    loadCards,
    syncCards
};
