import './App.css';
import { useState } from 'react';
import ClockApp from './ClockApp';
import BudgetsApp from './BudgetsApp';
import { Navigate, HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

export default function App() {
  
let [appDisplay, setAppDisplay] = useState('clock');

  return <div
    className='application-wrap'
  >
    <Router>
    <div
        className='switcher-wrap'
      >
        <Link className='link' to={'clock'}>View Clock</Link>
        <Link className='link' to={'budget'}>View Budgets</Link>
      </div>
      <Routes>
        <Route
          path={'/clock/*'}
          element={<ClockApp/>}
        />
        <Route
          path={'/budget/*'}
          element={<BudgetsApp/>}
        />
        <Route
          path={'*'}
          element={<Navigate
            to={'/clock'}
            replace
          />
        }
        />
      </Routes>
    </Router>
    </div>

}