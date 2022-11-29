import './BudgetsApp.css';
import {useState, useEffect} from 'react';

export default function BudgetsApp() {

    let [budgets, setBudgets] = useState([]);

    let doFetch = async () => {
        let response = await fetch('static/media/budget.txt');    
        let text = await response.text();
    
        // let text = "Groceries:70/100\nGas:105/100\n";
        
        let budgetsArray = text.split('\n');
        let budgets = budgetsArray.map(b => {
          if(!b) return;
          let name = b.split(":")[0];
          let numbers = b.split(":")[1].split("/");
          return {
            name: name,
            used: parseInt(numbers[0]),
            total: parseInt(numbers[1])
          }
        });
        setBudgets(budgets);    
      }
    
      useEffect(() => {
        doFetch();
      }, []);

    return <div
        className='budget-app'
    >
            {budgets.map(b => {
                if(!b) return null;

                let percentageUsed = (b.used/b.total)*100;
                let statusClass = '';

                if(percentageUsed >= 70){
                    statusClass = 'soft-warn';
                }

                if(percentageUsed >= 90) {
                    statusClass = 'warn'
                }

                if(percentageUsed >= 100) {
                    statusClass = 'over'
                }

              return <div
              className={'budget'}
              key={b.name}
              >
                <span>{b.name} : ${b.used} / {b.total}</span>
                <div
                    className='budget-outer'
                >
                    <div
                        className={`budget-inner ${statusClass}`}
                        style={{width: `${percentageUsed}%`}}
                    ></div>
                </div>
                </div>
            })}
    </div>
}