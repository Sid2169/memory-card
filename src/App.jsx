import './App.css'
import Game from './components/Game.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="#main">Memory Card</a>
        <a className="project-label" href="https://www.theodinproject.com/lessons/node-path-react-new-memory-card">The Odin Project ↗</a>
      </header>
      <main id="main" className="workspace">
        <Game />
      </main>
      <footer className="app-footer">
        <p>
          <span className="footer-label">Created by</span>{' '}
          <a href="https://sidsingh.vercel.app/" rel="me">Siddhartha <span aria-hidden="true">↗</span></a>
        </p>
        <nav className="profile-links" aria-label="Siddhartha's profiles">
          <a className="icon-link" href="https://github.com/Sid2169" rel="me" aria-label="Siddhartha on GitHub" title="GitHub">
            <img src={`${import.meta.env.BASE_URL}github.svg`} width="18" height="18" alt="" />
          </a>
          <a className="icon-link" href="https://www.linkedin.com/in/siddhartha-suman-952a64256/" rel="me" aria-label="Siddhartha on LinkedIn" title="LinkedIn">
            <img src={`${import.meta.env.BASE_URL}linkedin.svg`} width="18" height="18" alt="" />
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default App
