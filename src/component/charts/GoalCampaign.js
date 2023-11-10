import {VictoryVoronoiContainer, VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";


function CustomFlyout(props) {
  console.log(props);
    const {x, y} = props;
    const newX = x - 45;
    const newY = y - 42;

    return (
        <g>
        <rect width="92" height="42" x={newX} y={newY} rx={5} stroke="#4AB28B" fill="none" strokeWidth={1}/>
        <rect width="91" height="41" x={newX} y={newY} rx={5} stroke="#1D7151" fill="none" strokeWidth={2}/>
        <rect width="90" height="40" x={newX} y={newY} rx={5} stroke="#10573C" fill="none" strokeWidth={1}/>
        </g>
        
    );
}

function GoalCampaign() {

  const categoryData = [
    {
        campaignCategory: "가", currentBudget: 300000, goalBudget: 600000, label:""
    },
    {
        campaignCategory: "나", currentBudget: 400000, goalBudget: 500000, label:""
    },
    {
        campaignCategory: "다", currentBudget: 300000, goalBudget: 800000, label:""
    },
    {
        campaignCategory: "라", currentBudget: 200000, goalBudget: 300000, label:""
    },
    {
        campaignCategory: "마", currentBudget: 150000, goalBudget: 220000, label:""
    }
  ];

  const eventHandlerCurrentData = [
    {
      target: "data",
      eventHandlers: {
        onMouseOver: () => {
            return [
                {
                    target: "data",
                    mutation: ({style}) => {
                        const strokeWidth = style && style.strokeWidth
                        return strokeWidth === 1 ? {style: {fill:"#FFF8A8", stroke: "#10573C", strokeWidth: 3}} : {style:{fill:"#FFF8A8", stroke: "#FFEB00", strokeWidth: 3}};
                    }
                }
            ];
        },
        onMouseOut: () => {
            return [
                {
                    target: "data",
                    mutation: ({style}) => {
                        const stroke = style && style.stroke
                        return stroke === "#FFEB00" ? {style:{fill:"#FFF8A8", stroke: "#FFEB00", strokeWidth: 3}} : null;
                    }
                }
            ];
        },
        onClick: () => {
            return [
                {
                    target: "data",
                    mutation: ({style}) => {
                        const stroke = style && style.stroke;
                        return stroke === "#10573C" ? {style:{fill:"#FFF8A8", stroke: "#FFEB00", strokeWidth: 3}} : null;
                    }
                },
                {
                    target: "labels",
                    mutation: ({data, index, text}) => {
                        // const {data, index, text} = eventProps;
                        const currentBudget = data[index].currentBudget
                        // console.log(e);
                        // console.log(e.data[e.index].campaings);
                        return text !== `${currentBudget/10000}만원` ? { text: `${currentBudget/10000}만원` } : null 
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
      fill: "none",
      fillOpacity: 0.7
    }
  }

  const axisStyle = {
    axis: {stroke: "#10573C", strokeWidth: 3},
    axisLabel: {fontSize: 14, padding: 36, fill: "#10573C"},
    tickLabels: {fontSize: 15, padding: 4, fill: "#10573C"}
  } 

  return(
      <div className='chartbox'>
          <h4>카테고리별 현재 모금액 합계</h4>
          <VictoryChart 
          domainPadding={50} 
          style={monthlyChartStyle}
          width={1200} height={500}
          containerComponent={
            <VictoryVoronoiContainer style={{width: 1000, height: 500}}
            labels={
              ({ datum }) => `${datum.currentBudget/10000}만원`
            }
            labelComponent={<VictoryTooltip
            dx={0}
            dy={6.6}
            flyoutComponent={<CustomFlyout/>}
            />}/>
          }> 
            <VictoryAxis
              tickValues={[1,2,3,4,5]}
              tickFormat={["재난", "지구촌", "아동", "노인", "소외"]}
              style={axisStyle}
            />
            <VictoryAxis 
            dependentAxis
            tickFormat={(x) => `${x/10000}만원`}
            style={axisStyle}
            />

            <VictoryBar data={categoryData} 
            barWidth={40}
            events={eventHandlerCurrentData} 
            style={monthlyDataStyle}
            x="campaignCategory" 
            y="currentBudget"
            animate={{duration: 2000, onLoad: { duration: 1000 }}}/>

          </VictoryChart>
      </div>
  );
}

export default GoalCampaign;