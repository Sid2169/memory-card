import { useEffect, useState } from 'react'
import { createRound, selectCard } from '../game.js'
import { readBestScores, recordBest, saveBestScores } from '../scores.js'

export default function useGame() {
  const [round, setRound] = useState(() => createRound('easy'))
  const [bestScores, setBestScores] = useState(() => readBestScores())

  useEffect(() => {
    saveBestScores(bestScores)
  }, [bestScores])

  function pick(id) {
    const next = selectCard(round, id)
    setRound(next)
    setBestScores((scores) => recordBest(scores, next.difficulty, next.picked.length))
  }

  function restart(difficulty = round.difficulty) {
    setRound(createRound(difficulty))
  }

  return { round, best: bestScores[round.difficulty], pick, restart }
}
