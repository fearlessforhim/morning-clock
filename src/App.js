import logo from './logo.svg';
import './App.css';
import ArcBuilder from './svg-arc-builder';
import {useState, useEffect} from 'react';
import { faHeart,faCommentDots,faShareSquare, faTshirt, faSun, faShoePrints, faUtensils, faTooth, faCar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HourNumbers from './HourNumbers';

function App() {
  let [now, setNow] = useState(new Date());
  let [budgets, setBudgets] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 100);
  }, [now]);

  let doFetch = async () => {
    let response = await fetch('static/media/budget.txt');    
    console.log(response);
    let text = await response.text();

    // let text = "Groceries:40/100\nGas:50/100";
    
    let budgetsArray = text.split('\n');
    let budgets = budgetsArray.map(b => {
      let name = b.split(":")[0];
      let numbers = b.split(":")[1].split("/");
      return {
        name: name,
        used: parseInt(numbers[0]),
        total: parseInt(numbers[1])
      }
    });
    console.log(budgets);
    setBudgets(budgets);    
  }

  useEffect(() => {
    doFetch();
  }, []);

  let nowMillis = new Date().getTime();
  let secondHandDegrees = ((nowMillis % 60000)/60000) * 360;
  let minuteHandDegrees = ((nowMillis % 3600000)/3600000) * 360;
  let millisIntoDay = nowMillis % 86400000;
  let secondsIntoDay = millisIntoDay / 1000;
  let minutesIntoDay = secondsIntoDay / 60;
  let hoursAfter12 = (minutesIntoDay / 60) - 7 - 12;//PST offset
  let hourHandDegrees = (hoursAfter12 / 12) * 360;

  let arcs = () => {
    let arcBuilder = new ArcBuilder();
    let wakeHour = 13;
    let wakeMinute = 0;
    let icons = [];
    let additionalText = [
      <text
      key={'time'}
        x={0}
        y={50}
        textAnchor={'middle'}
        style={{'fontSize': '48px'}}
        strokeWidth={'1px'}
        fill={'white'}
      >
        {`${now.getHours()}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`}
      </text>
    ];

    arcBuilder.addConfig({startDegrees: 0, lengthInDegrees: (59.99999/60) * 360, color: 'gray', rounded: false});

    if(now.getHours() === wakeHour){
      arcBuilder.addConfig({startDegrees: (30/60) * 360, lengthInDegrees: (10/60) * 360, color: 'yellow', rounded: false});
      icons.push(
        <FontAwesomeIcon
        key={'sun'}
        icon={faSun}
        />
      );
      additionalText.push(
        <text
        key={`wake-up`}
          x={-50}
          y={350}
          textAnchor={'middle'}
          style={{'fontSize': '32px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          Wake Up!
        </text>
      );
      if(now.getMinutes() < wakeMinute){
        arcBuilder.addConfig({startDegrees: (40/60) * 360, lengthInDegrees: (20/60) * 360, color: 'green', rounded: false});
        icons.push(
          <FontAwesomeIcon
          key={'t-shirt'}
          icon={faTshirt}
          />
        );
        additionalText.push(
          <text
          key={`get-dressed`}
            x={-50}
            y={150}
            textAnchor={'middle'}
            style={{'fontSize': '32px'}}
            strokeWidth={'1px'}
            fill={'white'}
          >
            Get Dressed
          </text>
        );
      } else if (now.getMinutes() >= wakeMinute && now.getMinutes() < wakeMinute + 15) {
        arcBuilder.addConfig({startDegrees: (40/60) * 360, lengthInDegrees: (20/60) * 360, color: 'green', rounded: false});
        icons.push(
          <FontAwesomeIcon
          key={`t-shirt`}
          icon={faTshirt}
          />
        );
        additionalText.push(
          <text
          key={`get-dressed`}
            x={-50}
            y={150}
            textAnchor={'middle'}
            style={{'fontSize': '32px'}}
            strokeWidth={'1px'}
            fill={'white'}
          >
            Get Dressed
          </text>
        );
      } else {
        arcBuilder.addConfig({startDegrees: (40/60) * 360, lengthInDegrees: (20/60) * 360, color: 'green', rounded: false});
        icons.push(
          <FontAwesomeIcon
          key={`t-shirt`}
          icon={faTshirt}
           />
        );
        additionalText.push(
          <text
          key={'get-dressed'}
            x={-50}
            y={150}
            textAnchor={'middle'}
            style={{'fontSize': '32px'}}
            strokeWidth={'1px'}
            fill={'white'}
          >
            Get Dressed
          </text>
        );

        arcBuilder.addConfig({startDegrees: (0/60) * 360, lengthInDegrees: (30/60) * 360, color: 'red', rounded: false});
        icons.push(
          <FontAwesomeIcon
          key={`shoe-prints`}
          icon={faShoePrints} />
        );
        icons.push(
          <FontAwesomeIcon
          key={`t-utensils`}
          icon={faUtensils} />
        );
        additionalText.push(
          <text
          key={`breakfast-shoes`}
            x={450}
            y={200}
            textAnchor={'middle'}
            style={{'fontSize': '32px'}}
            strokeWidth={'1px'}
            fill={'white'}
          >
            Eat/Shoes
          </text>
        );
      }
    } else if (now.getHours() === wakeHour + 1) {
      arcBuilder.addConfig({startDegrees: (40/60) * 360, lengthInDegrees: (20/60) * 360, color: 'gray', rounded: false});
      arcBuilder.addConfig({startDegrees: (0/60) * 360, lengthInDegrees: (30/60) * 360, color: 'red', rounded: false});
      icons.push(
        <FontAwesomeIcon
        key={`t-shirt`}
        icon={faShoePrints} />
      );
      icons.push(
        <FontAwesomeIcon
        key={`t-utensils`}
        icon={faUtensils} />
      );
      additionalText.push(
        <text
        key={`breakfast-shoes`}
          x={475}
          y={190}
          textAnchor={'middle'}
          style={{'fontSize': '32px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          Breakfast/Shoes
        </text>
      );
      arcBuilder.addConfig({startDegrees: (30/60) * 360, lengthInDegrees: (10/60) * 360, color: '#E600FF', rounded: false});
      icons.push(
        <FontAwesomeIcon
        key={`tooth`}
        icon={faTooth} />
      );
      additionalText.push(
        <text
        key={`brush-teeth`}
          x={0}
          y={375}
          textAnchor={'middle'}
          style={{'fontSize': '24px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          Brush Teeth
        </text>
      );
      arcBuilder.addConfig({startDegrees: (40/60) * 360, lengthInDegrees: (10/60) * 360, color: 'orange', rounded: false});
      icons.push(
        <FontAwesomeIcon
        key={`car`}
        icon={faCar} />
      );
      additionalText.push(
        <text
        key={`to-the-car`}
          x={-100}
          y={200}
          textAnchor={'middle'}
          style={{'fontSize': '32px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          To the car
        </text>
      );
    }


    return {
      arcs: arcBuilder.getArcs(),
      icons: icons,
      text: additionalText
    }
  }

  let arcData = arcs();

  return (
    <div className="App">
          {arcData.icons.map(i => i)}
          <svg style={{fill: 'none', 'strokeWidth': 40}} width="100%" height="100%" viewBox={'0 0 400 400'}>
           {arcData.arcs.map((a, idx) => {
             return <path
             key={idx}
             id={a.id}
             d={a.path}
             stroke={a.color}
             strokeLinecap={a.rounded ? 'round' : ''}
             />
           })}
          <HourNumbers/>
          {arcData.text.map(t => t)}
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="75"
          style={{stroke: '#AAA', 'strokeWidth': 20}}
          transform={`rotate(${hourHandDegrees} 200 200)`}
          strokeLinecap={'round'}
        />
        <line
         x1="200"
         y1="200"
          x2="200"
          y2="20"
          style={{stroke: 'orange', 'strokeWidth': 10}}
          transform={`rotate(${minuteHandDegrees} 200 200)`}
          strokeLinecap={'round'}
        />
        <line
         x1="200"
         y1="200"
          x2="200"
          y2="20"
          style={{stroke: '#B9B9B9', 'strokeWidth': 1.5}}
          transform={`rotate(${secondHandDegrees} 200 200)`}
          strokeLinecap={'round'}
        />
          </svg>
          <div
          className={'budgets'}
          >
            {budgets.map(b => {
              return <div
              className={'budget'}
              key={b.name}
              >
                {b.name} : {b.used}/{b.total}
                </div>
            })}
          </div>
    </div>
  );
}

export default App;
