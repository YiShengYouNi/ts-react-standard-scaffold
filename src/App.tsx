import type { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';

const App: FC = () => {
  return (
    <div className="container-app">
      <header className="app-header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About (Lazy)</Link>
          <Link to="/todo">Todo (Lazy)</Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">© 2025 TS + React Standard Project</footer>
    </div>
  );
};
export default App;
