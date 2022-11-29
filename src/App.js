import './App.css';
import { useState } from 'react';
import ClockApp from './ClockApp';
import BudgetsApp from './BudgetsApp';

export default function App() {
  
let [appDisplay, setAppDisplay] = useState('clock');

  return <div
    className='application-wrap'
  >
    <div
      className='switcher-wrap'
    >
      {appDisplay === 'budget' && <div onClick={() => {setAppDisplay('clock');}}>View Clock</div>}
      {appDisplay === 'clock' && <div onClick={() => {setAppDisplay('budget');}}>View Budgets</div>}
    </div>
    {
      appDisplay === 'clock' &&
      <ClockApp/>
    }
    {
      appDisplay === 'budget' &&
      <BudgetsApp/>
    }
    </div>

}