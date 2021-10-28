import React from 'react'

const Card = ({card, transform}) => (
    <img key={card.id} className='Card'
         style={{transform}}
         src={card.image} alt={card.name}/>
)

export default Card;