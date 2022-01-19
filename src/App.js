import logo from './logo.svg';
import './App.css';
import ArcBuilder from './svg-arc-builder';
import {useState, useEffect} from 'react';

function App() {
  let [now, setNow] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 100);
  }, [now]);

  let additionalText = [
    <text
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

  let nowMillis = new Date().getTime();
  let secondHandDegrees = ((nowMillis % 60000)/60000) * 360;
  let minuteHandDegrees = ((nowMillis % 3600000)/3600000) * 360;
  let millisIntoDay = nowMillis % 86400000;
  let secondsIntoDay = millisIntoDay / 1000;
  let minutesIntoDay = secondsIntoDay / 60;
  let hoursAfter12 = (minutesIntoDay / 60) - 8 - 12;//PST offset
  let hourHandDegrees = (hoursAfter12 / 12) * 360;

  let arcs = () => {
    let arcBuilder = new ArcBuilder();
    let wakeHour = 6;
    let wakeMinute = 30;

    arcBuilder.addConfig({startDegrees: 0, lengthInDegrees: (59.99999/60) * 360, color: 'gray', rounded: true});

    if(now.getHours() === wakeHour){
      arcBuilder.addConfig({startDegrees: (30/60) * 360, lengthInDegrees: (30/60) * 360, color: 'yellow', rounded: true});
      additionalText.push(
        <text
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
        arcBuilder.addConfig({startDegrees: (55/60) * 360, lengthInDegrees: (5/60) * 360, color: 'green', rounded: true});
      } else if (now.getMinutes() > wakeMinute && now.getMinutes() < wakeMinute + 15) {
        arcBuilder.addConfig({startDegrees: (55/60) * 360, lengthInDegrees: (20/60) * 360, color: 'green', rounded: true});
      } else {
        arcBuilder.addConfig({startDegrees: (55/60) * 360, lengthInDegrees: (20/60) * 360, color: 'green', rounded: true});
        additionalText.push(
          <text
            x={350}
            y={25}
            textAnchor={'middle'}
            style={{'fontSize': '32px'}}
            strokeWidth={'1px'}
            fill={'white'}
          >
            Get Dressed
          </text>
        );

        arcBuilder.addConfig({startDegrees: (10/60) * 360, lengthInDegrees: (20/60) * 360, color: 'red', rounded: true});
        additionalText.push(
          <text
            x={450}
            y={200}
            textAnchor={'middle'}
            style={{'fontSize': '32px'}}
            strokeWidth={'1px'}
            fill={'white'}
          >
            Breakfast
          </text>
        );
      }
    } else if (now.getHours() === wakeHour + 1) {
      arcBuilder.addConfig({startDegrees: (55/60) * 360, lengthInDegrees: (20/60) * 360, color: 'green', rounded: true});
      additionalText.push(
        <text
          x={350}
          y={25}
          textAnchor={'middle'}
          style={{'fontSize': '32px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          Get Dressed
        </text>
      );
      arcBuilder.addConfig({startDegrees: (10/60) * 360, lengthInDegrees: (10/60) * 360, color: 'red', rounded: true});
      additionalText.push(
        <text
          x={450}
          y={200}
          textAnchor={'middle'}
          style={{'fontSize': '32px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          Breakfast
        </text>
      );
      arcBuilder.addConfig({startDegrees: (20/60) * 360, lengthInDegrees: (10/60) * 360, color: 'blue', rounded: true});
      additionalText.push(
        <text
          x={400}
          y={375}
          textAnchor={'middle'}
          style={{'fontSize': '32px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          Play Time
        </text>
      );
      arcBuilder.addConfig({startDegrees: (30/60) * 360, lengthInDegrees: (10/60) * 360, color: '#E600FF', rounded: true});
      additionalText.push(
        <text
          x={0}
          y={375}
          textAnchor={'middle'}
          style={{'fontSize': '24px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          Shoes and jackets
        </text>
      );
      arcBuilder.addConfig({startDegrees: (40/60) * 360, lengthInDegrees: (10/60) * 360, color: 'orange', rounded: true});
      additionalText.push(
        <text
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

    return arcBuilder.getArcs();
  }

  return (
    <div className="App">
          <svg style={{fill: 'none', 'strokeWidth': 40}} width="100%" height="100%" viewBox={'0 0 400 400'}>
           {arcs().map((a, idx) => {
             return <path
             key={idx}
             id={a.id}
             d={a.path}
             stroke={a.color}
             strokeLinecap={a.rounded ? 'round' : ''}
             />
           })}

          <text
            x={200}
            y={75}
            textAnchor={'middle'}
            style={{'fontSize': '48px'}}
            strokeWidth={'1px'}
            fill={'white'}
          >
            12
          </text>
         <text
           x={325}
           y={200}
           textAnchor={'middle'}
           style={{'fontSize': '48px'}}
           strokeWidth={'1px'}
           fill={'white'}
         >
           3
         </text>
         <text
           x={200}
           y={350}
           textAnchor={'middle'}
           style={{'fontSize': '48px'}}
           strokeWidth={'1px'}
           fill={'white'}
         >
           6
         </text>
        <text
          x={75}
          y={200}
          textAnchor={'middle'}
          style={{'fontSize': '48px'}}
          strokeWidth={'1px'}
          fill={'white'}
        >
          9
        </text>
        {additionalText.map(t => t)}

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
          style={{stroke: '#444', 'strokeWidth': 1.5}}
          transform={`rotate(${secondHandDegrees} 200 200)`}
          strokeLinecap={'round'}
        />
          </svg>
    </div>
  );
}

export default App;
