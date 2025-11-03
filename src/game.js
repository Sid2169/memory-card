export const DIFFICULTIES = {
  easy: { label: 'Easy', size: 6 },
  medium: { label: 'Medium', size: 9 },
  hard: { label: 'Hard', size: 15 },
}

const descriptions = [
  'Dark-haired figure in profile with a turquoise eye',
  'Long-haired woman wearing a cross earring',
  'Spiky-haired boy with folded arms',
  'Green-eyed figure wearing a pendant',
  'Masked ninja with a leaf headband',
  'Blue figure wearing an ornate crown',
  'Figure leaning against a tree beside a lake',
  'Swordsman standing in a rainstorm',
  'Pierced ninja with a high collar',
  'Cloaked figure beneath a full moon',
  'Ninja perched on a post with birds',
  'Red-haired woman in armor',
  'Pencil portrait with a scarf covering the face',
  'Long-haired armored swordswoman holding a sword',
  'Spiky-haired warrior with two figures behind him',
]

export const CARDS = descriptions.map((description, index) => ({
  id: `p${index + 1}`,
  description,
  image: `pictures/p${index + 1}.jpeg`,
}))

export function shuffle(cards, random = Math.random) {
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function createRound(difficulty, random = Math.random) {
  return {
    difficulty,
    cards: shuffle(CARDS, random).slice(0, DIFFICULTIES[difficulty].size),
    picked: [],
    status: 'playing',
  }
}

export function selectCard(round, id, random = Math.random) {
  if (round.status !== 'playing' || !round.cards.some((card) => card.id === id)) {
    return round
  }

  const repeated = round.picked.includes(id)
  const picked = repeated ? round.picked : [...round.picked, id]
  return {
    ...round,
    cards: shuffle(round.cards, random),
    picked,
    status: repeated ? 'lost' : picked.length === round.cards.length ? 'won' : 'playing',
  }
}
