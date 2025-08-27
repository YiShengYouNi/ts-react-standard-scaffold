import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App(): JSX.Element {
  return (
    <div className="container-app">
      <header className="app-header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About (Lazy)</Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">© 2025 TS + React Standard Project</footer>
    </div>
  )
}
