import test from 'node:test'
import assert from 'node:assert/strict'
import { CARDS, DIFFICULTIES, createRound, selectCard, shuffle } from '../src/game.js'

test('shuffle reorders a copy without changing card identities or the input', () => {
  const original = [...CARDS]
  const shuffled = shuffle(CARDS, () => 0)
  assert.deepEqual(CARDS, original)
  assert.notDeepEqual(shuffled, original)
  assert.deepEqual([...shuffled].sort((a, b) => a.id.localeCompare(b.id)),
    [...original].sort((a, b) => a.id.localeCompare(b.id)))
  assert.ok(shuffled.every((card) => CARDS.includes(card)))
})

test('each difficulty starts with the right number of unique pictures', () => {
  for (const [difficulty, { size }] of Object.entries(DIFFICULTIES)) {
    const round = createRound(difficulty, () => 0)
    assert.equal(round.cards.length, size)
    assert.equal(new Set(round.cards.map((card) => card.id)).size, size)
    assert.deepEqual(round.picked, [])
    assert.equal(round.status, 'playing')
  }
})

test('selection follows stable identity across shuffles and a repeat loses without scoring', () => {
  const initial = createRound('easy', () => 0)
  const id = initial.cards[0].id
  const first = selectCard(initial, id, () => 0)
  assert.deepEqual(initial.picked, [])
  assert.deepEqual(first.picked, [id])
  assert.notEqual(first.cards.findIndex((card) => card.id === id), 0)
  const lost = selectCard(first, id, () => 0)
  assert.equal(lost.status, 'lost')
  assert.equal(lost.picked.length, 1)
  assert.equal(selectCard(lost, lost.cards[0].id), lost)
})

test('every unique card wins, and completed rounds ignore further clicks', () => {
  for (const difficulty of Object.keys(DIFFICULTIES)) {
    let round = createRound(difficulty)
    const ids = round.cards.map((card) => card.id)
    for (const [index, id] of ids.entries()) {
      round = selectCard(round, id)
      assert.equal(round.picked.length, index + 1)
      assert.equal(round.status, index === ids.length - 1 ? 'won' : 'playing')
    }
    assert.equal(selectCard(round, ids[0]), round)
  }
})

test('an unknown card cannot score or end a round; restarting clears selections', () => {
  const initial = createRound('medium')
  assert.equal(selectCard(initial, 'not-a-card'), initial)
  const played = selectCard(initial, initial.cards[0].id)
  const restarted = createRound(played.difficulty)
  assert.equal(restarted.difficulty, 'medium')
  assert.equal(restarted.picked.length, 0)
  assert.equal(restarted.status, 'playing')
})
