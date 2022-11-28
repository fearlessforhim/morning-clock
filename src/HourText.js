export default function HourText(props) {
    return <text
    x={props.x}
    y={props.y}
    textAnchor={'middle'}
    style={{'fontSize': '48px'}}
    strokeWidth={'1px'}
    fill={'white'}
  >
    {props.hour}
  </text>
}