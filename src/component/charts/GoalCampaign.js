import {VictoryVoronoiContainer, VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";

/* customToolTipBox */ 
function CustomFlyout(flyoutComponentProps) {
  //console.log(flyoutComponentProps);
    const {x, y} = flyoutComponentProps;
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

function GoalCampaign(chartDataListProps) {

  /* chartData from API */
  /*
  const { chartDataList } = chartDataListProps;

  const tickValuesAttributes = chartDataList.map((attribute, index) => index + 1);
  const tickFormatAttributes = chartDataList.map(categoryname => categoryname.campaignCategory)
  */

  /* TestData */
  
  const categoryData = [
    {
        campaignCategory: "가", sumCurrentBudget: 300000, sumGoalBudget: 600000
    },
    {
        campaignCategory: "나", sumCurrentBudget: 400000, sumGoalBudget: 500000
    },
    {
        campaignCategory: "다", sumCurrentBudget: 300000, sumGoalBudget: 800000
    },
    {
        campaignCategory: "라", sumCurrentBudget: 200000, sumGoalBudget: 300000
    },
    {
        campaignCategory: "마", sumCurrentBudget: 150000, sumGoalBudget: 220000
    }
  ];

  const tickValuesAttributes = categoryData.map((attribute, index) => index + 1);
  const tickFormatAttributes = categoryData.map(categoryname => categoryname.campaignCategory)
  

  /* Event function setting */ 
  const mouseEventsHandler = [
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
        }/*,
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
        }*/
      }
    }
  ];

  /* chart figure */ 
  const width = 1500;
  const height = 700;

  /* x축, y축 기준 설정 */
  const stringX = 'campaignCategory';
  const stringY = 'sumCurrentBudget';

  /* style setting */ 
  const baseFillStyle = { fill: "#10573C" }
  const baseStrokeStyle = { stroke: "#10573C" }

  const chartStyle = {
    background: {
      fill: "none",
      fillOpacity: 0.7
    }
  }

  const axisStyle = {
    axis: { ...baseStrokeStyle, strokeWidth: 3 },
    axisLabel: {fontSize: 14, padding: 36, ...baseFillStyle},
    tickLabels: {fontSize: 15, padding: 4, ...baseFillStyle}
  } 

  const barStyle = {
    data: {
      ...baseFillStyle,
      fillOpacity: 0.5,
      ...baseStrokeStyle,
      strokeWidth: 1
    },
    labels: {
      ...baseFillStyle,
      fontSize: 20
      //fill: ({ index }) => + index % 2 === 0 ? "#10573C" : "#000000" 
    }
  }

  /* chart animate setting */ 
  /*
    const chartAminate = {
    duration: 2000, 
    onLoad: { duration: 1000 }
  }
  */

  /* render */ 
  return(
    <div className='chartbox'>
      <h4>카테고리별 현재 모금액 합계</h4>
      <VictoryChart 
        domainPadding={50} 
        style={chartStyle}
        width={width} height={height}
        containerComponent={
          <VictoryVoronoiContainer 
            labels={
              ({ datum }) => `${datum._y}원`
            }
            labelComponent={
              <VictoryTooltip
                dx={0}
                dy={6.6}
                flyoutComponent={<CustomFlyout/>}
              />
            }
          />
        }
      > 
        <VictoryAxis
          tickValues={tickValuesAttributes}
          tickFormat={tickFormatAttributes}
          style={axisStyle}
        />
        <VictoryAxis dependentAxis
          tickFormat={(x) => `${x}원`}
          style={axisStyle}
        />
        <VictoryBar 
          data={categoryData} 
          //labels={""}
          barWidth={40}
          events={mouseEventsHandler} 
          style={barStyle}
          x={stringX} 
          y={stringY}
          // animate={chartAminate}
        />
      </VictoryChart>
    </div>
  );
}

export default GoalCampaign;