import test from 'node:test'
import assert from 'node:assert/strict'
import { readBestScores, recordBest, saveBestScores } from '../src/scores.js'

test('best scores survive a storage round trip and remain separate by difficulty', () => {
  let saved = null
  const storage = {
    getItem: () => saved,
    setItem: (_key, value) => { saved = value },
  }
  const empty = readBestScores(storage)
  assert.deepEqual(empty, { easy: 0, medium: 0, hard: 0 })
  const easy = recordBest(empty, 'easy', 5)
  assert.equal(recordBest(easy, 'easy', 2), easy)
  const hard = recordBest(easy, 'hard', 10)
  saveBestScores(hard, storage)
  assert.deepEqual(readBestScores(storage), { easy: 5, medium: 0, hard: 10 })
  assert.deepEqual(empty, { easy: 0, medium: 0, hard: 0 })
})

test('malformed and out-of-range saved scores cannot corrupt the scoreboard', () => {
  const read = (value) => readBestScores({ getItem: () => value })
  for (const value of ['broken JSON', null, 'null', '[]', '42']) {
    assert.deepEqual(read(value), { easy: 0, medium: 0, hard: 0 })
  }
  assert.deepEqual(read('{"easy":7,"medium":-1,"hard":"13"}'),
    { easy: 0, medium: 0, hard: 0 })
  assert.deepEqual(read('{"easy":6,"medium":2.5,"hard":13}'),
    { easy: 6, medium: 0, hard: 13 })
  assert.equal(read('{"hard":15}').hard, 15)
  assert.equal(read('{"hard":16}').hard, 0)
})

test('blocked storage does not prevent reading defaults or saving in-memory scores', () => {
  const blocked = {
    getItem: () => { throw new Error('Storage blocked') },
    setItem: () => { throw new Error('Storage full') },
  }
  assert.deepEqual(readBestScores(blocked), { easy: 0, medium: 0, hard: 0 })
  assert.doesNotThrow(() => saveBestScores({ easy: 4, medium: 0, hard: 0 }, blocked))
})
