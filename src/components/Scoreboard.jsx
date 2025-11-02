export default function Scoreboard({ score, best, total }) {
  return (
    <dl className="scoreboard" aria-label="Scoreboard">
      <div className="score-current">
        <dt>Score</dt>
        <dd>{score}<span> / {total}</span></dd>
      </div>
      <div>
        <dt>Personal best</dt>
        <dd>{best}<span> / {total}</span></dd>
      </div>
    </dl>
  )
}
