import { useLayoutEffect, useRef } from 'react'
import { DIFFICULTIES } from '../game.js'
import useGame from '../hooks/useGame.js'
import CardGrid from './CardGrid.jsx'
import Scoreboard from './Scoreboard.jsx'

export default function Game() {
  const { round, best, pick, restart } = useGame()
  const gridRef = useRef(null)
  const resultRef = useRef(null)
  const focusCard = useRef(null)
  const score = round.picked.length
  const total = round.cards.length
  const finished = round.status !== 'playing'

  useLayoutEffect(() => {
    if (round.status !== 'playing') {
      resultRef.current?.focus()
    } else if (focusCard.current) {
      const selector = focusCard.current === 'first'
        ? 'button'
        : `[data-card-id="${focusCard.current}"]`
      gridRef.current?.querySelector(selector)?.focus({ preventScroll: true })
    }
    focusCard.current = null
  }, [round])

  function handlePick(id) {
    focusCard.current = id
    pick(id)
  }

  function handleRestart() {
    focusCard.current = 'first'
    restart()
  }

  return (
    <section className="game" aria-labelledby="game-title">
      <div className="game-heading">
        <div>
          <p className="eyebrow">A little attention. A little memory.</p>
          <h1 id="game-title">No second guesses.</h1>
          <p className="game-rules">Pick each picture once. The cards shuffle after every pick.</p>
        </div>
        <Scoreboard score={score} best={best} total={total} />
      </div>

      <div className="game-toolbar">
        <fieldset className="difficulty">
          <legend>Difficulty</legend>
          <div className="difficulty-options">
            {Object.entries(DIFFICULTIES).map(([key, { label, size }]) => (
              <button
                key={key}
                type="button"
                aria-pressed={round.difficulty === key}
                title={`${label}: ${size} pictures. Starts a new round.`}
                onClick={() => {
                  if (key !== round.difficulty) restart(key)
                }}
              >
                {label}<span className="sr-only">, {size} pictures</span>
              </button>
            ))}
          </div>
        </fieldset>
        {!finished && (
          <button className="button button-secondary" type="button" onClick={handleRestart}>
            Restart
          </button>
        )}
      </div>

      <div className="round-progress" aria-hidden="true">
        <span style={{ width: `${(score / total) * 100}%` }} />
      </div>
      <p className="sr-only" role="status" aria-atomic="true">
        {!finished ? `${DIFFICULTIES[round.difficulty].label} round. ${score} of ${total} pictures picked.` : ''}
      </p>

      {finished && (
        <section className={`round-result ${round.status}`} aria-labelledby="result-title">
          <div>
            <h2 id="result-title" aria-describedby="result-summary" ref={resultRef} tabIndex={-1}>
              {round.status === 'won' ? 'Every picture. First try.' : 'That one looked familiar.'}
            </h2>
            <p id="result-summary">
              {round.status === 'won'
                ? `You remembered all ${total} pictures. A perfect round.`
                : `You picked that picture twice. ${score} of ${total} remembered this round.`}
            </p>
          </div>
          <button className="button" type="button" onClick={handleRestart}>Play again</button>
        </section>
      )}

      <CardGrid cards={round.cards} disabled={finished} onPick={handlePick} gridRef={gridRef} />
    </section>
  )
}
