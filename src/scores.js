import { DIFFICULTIES } from './game.js'

const STORAGE_KEY = 'memory-card:best-scores:v1'

export function readBestScores(storage) {
  try {
    const saved = JSON.parse((storage ?? globalThis.localStorage).getItem(STORAGE_KEY))
    return Object.fromEntries(Object.entries(DIFFICULTIES).map(([difficulty, { size }]) => {
      const score = saved?.[difficulty]
      return [difficulty, Number.isInteger(score) && score >= 0 && score <= size ? score : 0]
    }))
  } catch {
    return { easy: 0, medium: 0, hard: 0 }
  }
}

export function recordBest(scores, difficulty, score) {
  return score > scores[difficulty] ? { ...scores, [difficulty]: score } : scores
}

export function saveBestScores(scores, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch {
    // A blocked or full browser store should never interrupt the round.
  }
}
