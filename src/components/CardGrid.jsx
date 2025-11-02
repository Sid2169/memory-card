import { useState } from 'react'

function Card({ card, disabled, onPick }) {
  const [failed, setFailed] = useState(false)

  return (
    <button
      className="picture-card"
      type="button"
      data-card-id={card.id}
      aria-label={`Pick: ${card.description}`}
      disabled={disabled}
      onClick={() => onPick(card.id)}
    >
      {failed ? (
        <span className="image-fallback" aria-hidden="true">
          <span>Image unavailable</span>
          {card.description}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${card.image}`}
          alt=""
          width="400"
          height="400"
          draggable="false"
          onError={() => setFailed(true)}
        />
      )}
    </button>
  )
}

export default function CardGrid({ cards, disabled, onPick, gridRef }) {
  return (
    <ul className={`card-grid${cards.length <= 9 ? ' card-grid-small' : ''}`} aria-label="Picture cards" ref={gridRef}>
      {cards.map((card) => (
        <li key={card.id}>
          <Card card={card} disabled={disabled} onPick={onPick} />
        </li>
      ))}
    </ul>
  )
}
