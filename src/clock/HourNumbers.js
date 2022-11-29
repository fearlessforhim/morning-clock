import HourText from "./HourText";

export default function HourNumbers() {
    return  <g>
    <HourText
      x={200}
      y={80}
      hour={'12'}
    />
    <HourText
      x={265}
      y={95}
      hour={'1'}
    />
    <text
      x={315}
      y={145}
      textAnchor={'middle'}
      style={{'fontSize': '48px'}}
      strokeWidth={'1px'}
      fill={'white'}
    >
      2
    </text>
   <text
     x={340}
     y={215}
     textAnchor={'middle'}
     style={{'fontSize': '48px'}}
     strokeWidth={'1px'}
     fill={'white'}
   >
     3
   </text>
   <text
     x={315}
     y={275}
     textAnchor={'middle'}
     style={{'fontSize': '48px'}}
     strokeWidth={'1px'}
     fill={'white'}
   >
     4
   </text>
   <text
     x={265}
     y={325}
     textAnchor={'middle'}
     style={{'fontSize': '48px'}}
     strokeWidth={'1px'}
     fill={'white'}
   >
     5
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
     x={135}
     y={325}
     textAnchor={'middle'}
     style={{'fontSize': '48px'}}
     strokeWidth={'1px'}
     fill={'white'}
   >
     7
   </text>
   <text
     x={85}
     y={275}
     textAnchor={'middle'}
     style={{'fontSize': '48px'}}
     strokeWidth={'1px'}
     fill={'white'}
   >
     8
   </text>
  <text
    x={60}
    y={215}
    textAnchor={'middle'}
    style={{'fontSize': '48px'}}
    strokeWidth={'1px'}
    fill={'white'}
  >
    9
  </text>
  <text
    x={85}
    y={145}
    textAnchor={'middle'}
    style={{'fontSize': '48px'}}
    strokeWidth={'1px'}
    fill={'white'}
  >
    10
  </text>
  <text
    x={135}
    y={95}
    textAnchor={'middle'}
    style={{'fontSize': '48px'}}
    strokeWidth={'1px'}
    fill={'white'}
  >
    11
  </text>
  </g>
}