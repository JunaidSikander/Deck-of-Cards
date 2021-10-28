import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import Card from "./Card";

const DECK_OF_CARDS_API = 'https://deckofcardsapi.com/api/deck/new/shuffle';
const GET_CARD_API = 'https://deckofcardsapi.com/api/deck'

const Deck = () => {

    const [drawn, setDrawn] = useState([]);
    const [deck, setDeck] = useState(null);

    const randomNum = useRef(Math.floor(Math.random() * 360));

    useEffect(() => {
        (async () => {
            let deck = await axios.get(DECK_OF_CARDS_API);
            setDeck(deck.data);
        })()
    }, []);

    const fetchCardApi = async () => {
        const {deck_id: id} = deck;
        try {
            const cardUrl = `${GET_CARD_API}/${id}/draw`;
            const cardApiResponse = await axios.get(cardUrl);
            const {success, cards: newCard} = cardApiResponse.data;
            if (!success) {
                throw new Error("NO card remaining");
            }
            let card = newCard[0];
            setDrawn([
                ...drawn,
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.suit} ${card.value}`
                }
            ])
        } catch (e) {
            alert(e);
        }
    }

    const cards = drawn.map((card, index) => <Card key={index} card={card}
                                                   transform={`rotate(${randomNum.current * index}deg)`}/>)

    return (
        <div className='Deck'>
            <h1 className='Deck-title'>♦ Card Dealer ♦</h1>
            <h2 className='Deck-title subtitle'>♦ A little demo made with React ♦</h2>
            <button className='Deck-btn' onClick={fetchCardApi}>Get Card</button>
            <div className='Deck-cardarea'> {cards} </div>
        </div>
    )
};

export default Deck;