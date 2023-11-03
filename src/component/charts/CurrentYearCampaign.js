import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';

function CurrentYearCampaign() {


  const monthlyData = [
    {
      monthly: 1, campaings: 125, label: ""
    },
    {
      monthly: 2, campaings: 250, label: ""
    },
    {
      monthly: 3, campaings: 52, label: ""
    },
    {
      monthly: 4, campaings: 31, label: ""
    },
    {
      monthly: 5, campaings: 20, label: ""
    },
    {
      monthly: 6, campaings: 200, label: ""
    },
    {
      monthly: 7, campaings: 400, label: ""
    },
    {
      monthly: 8, campaings: 15, label: ""
    },
    {
      monthly: 9, campaings: 320, label: ""
    },
    {
      monthly: 10, campaings: 700, label: ""
    },
    {
      monthly: 11, campaings: 100, label: ""
    },
    {
      monthly: 12, campaings: 25, label: ""
    }
  ];
  
  const eventHandlerCustomData = [
    {
      target: "data",
      eventHandlers: {
        onClick: () => {
          return [{
            target: "labels",
            mutation: ({data, index, text}) => {
              // const {data, index, text} = eventProps;
              const campaings = data[index].campaings
              // console.log(e);
              // console.log(e.data[e.index].campaings);
              return text !== `${campaings}` ? { text: `${campaings}` } : null 
            }
          }];
        },
        onMouseOver: () => {
          return [{
            mutation: (eventProps) => {
              //console.log(eventProps);
              return {style: Object.assign({}, eventProps.style, {fill:"#03CB7F"})};
            }
          }]
        },
        onMouseOut: () => {
          return [{
            mutation: () => {
              return null;
            }
          }]
        }
      }
    }
  ];

  const monthlyDataStyle = {
    data: {
      fill: "#10573C",
      fillOpacity: 0.5,
      stroke: "#10573C",
      strokeWidth: 1
    },
    labels: {
      fill: "#10573C",
      fontSize: 12,
      //fill: ({ index }) => + index % 2 === 0 ? "#10573C" : "#000000" 
    }
  }

  const monthlyChartStyle = {
    background: {
      fill: "#8DFDFF",
      fillOpacity: 0.7,
    }
  }

  const axisStyle = {
    axis: {stroke: "#10573C", strokeWidth: 3},
    axisLabel: {fontSize: 9, padding: 35, fill: "#10573C"},
    tickLabels: {fontSize: 11, padding: 4, fill: "#10573C"}
  } 
  


  return(
      <div>
          <VictoryChart domainPadding={20} style={monthlyChartStyle} width={400} height={400}> 
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              tickFormat={["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]}
              style={axisStyle}
            />
            <VictoryAxis 
            dependentAxis
            label="단위 : 수"
            tickFormat={(x) => (`${x}`)}
            style={axisStyle}
            />

            <VictoryBar data={monthlyData} 
            barRatio={0.8}
            events={eventHandlerCustomData} 
            style={monthlyDataStyle}
            x="monthly" 
            y="campaings"
            animate={{duration: 2000, onLoad: { duration: 1000 }}}/>
          </VictoryChart>
      </div>
  );
}

export default CurrentYearCampaign;