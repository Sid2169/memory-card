import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="#main">Memory Card</a>
        <span className="project-label">The Odin Project · React</span>
      </header>
      <main id="main" className="workspace">
        <section className="starter" aria-labelledby="starter-title">
          <span className="eyebrow">Project scaffold</span>
          <h1 id="starter-title">Memory Card</h1>
          <p>React + Vite foundation. Gameplay and API integration are the next step.</p>
          <a className="button" href="https://www.theodinproject.com/lessons/node-path-react-new-memory-card">
            View assignment <span aria-hidden="true">↗</span>
          </a>
        </section>
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
