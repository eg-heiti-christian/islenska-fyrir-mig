import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import View from './components/View';

import NounCaseTrainer from './features/NounCaseTrainer';
import VerbConjugator from './features/VerbConjugator';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Verb Conjugation', to: '/verbs' },
  { label: 'Noun cases', to: '/nouns' }
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">ÍFM</span>
          <div>
            <p className="brand-title">Íslenka Fyrir Mig</p>
          </div>
        </div>
        <nav className="sidebar-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <span className="nav-dot" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="content-area">
        <Routes>
          <Route path="/" element={<View><Home /></View>} />
          <Route path="/verbs" element={<View><VerbConjugator /></View>} />
          <Route path="/nouns" element={<View><NounCaseTrainer /></View>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
