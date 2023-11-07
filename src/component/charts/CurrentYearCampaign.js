import {VictoryContainer, VictoryBar, VictoryChart, VictoryAxis} from 'victory';
import "../../assets/css/chart.css";

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
      monthly: 10, campaings: 552, label: ""
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
        onMouseOver: () => {
          return [{
            mutation: ({style}) => {
              const strokeWidth = style && style.strokeWidth
              return strokeWidth === 1 ? {style: {fill:"#FFF8A8", stroke: "#10573C", strokeWidth: 3}} : {style:{fill:"#FFF8A8", stroke: "#FFEB00", strokeWidth: 3}};
            }
          }]
        },
        onMouseOut: () => {
          return [{
            mutation: ({style}) => {
              const stroke = style && style.stroke
              return stroke === "#FFEB00" ? {style:{fill:"#FFF8A8", stroke: "#FFEB00", strokeWidth: 3}} : null;
            }
          }]
        },
        onClick: () => {
          return [
            {
            target: "labels",
            mutation: ({data, index, text}) => {
              // const {data, index, text} = eventProps;
              const campaings = data[index].campaings
              // console.log(e);
              // console.log(e.data[e.index].campaings);
              return text !== `${campaings}건` ? { text: `${campaings}건` } : null 
            }
          },
          {
            target: "data",
            mutation: ({style}) => {
              const stroke = style && style.stroke;
              return stroke === "#10573C" ? {style:{fill:"#FFF8A8", stroke: "#FFEB00", strokeWidth: 3}} : null;
            }
          }
        ];
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
      fontSize: 20
      //fill: ({ index }) => + index % 2 === 0 ? "#10573C" : "#000000" 
    }
  }

  const monthlyChartStyle = {
    background: {
      fill: "#8DFDFF",
      fillOpacity: 0.7
    }
  }

  const axisStyle = {
    axis: {stroke: "#10573C", strokeWidth: 3},
    axisLabel: {fontSize: 14, padding: 36, fill: "#10573C"},
    tickLabels: {fontSize: 18, padding: 4, fill: "#10573C"}
  } 
  


  return(
      <div className='chartbox'>
          <h4>당해 등록된 캠페인 수</h4>
          <VictoryChart 
          domainPadding={50} 
          style={monthlyChartStyle}
          width={1200} height={500}
          containerComponent={
          <VictoryContainer style={{width: 1000, height: 500}}/>
          }> 
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              tickFormat={["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]}
              style={axisStyle}
            />
            <VictoryAxis 
            dependentAxis
            label="단위 : 건"
            tickFormat={(x) => (`${x}`)}
            style={axisStyle}
            />

            <VictoryBar data={monthlyData} 
            barWidth={40}
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