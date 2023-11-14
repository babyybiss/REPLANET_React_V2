import {VictoryBar, VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryPolarAxis, VictoryStack} from 'victory';
import "../../assets/css/chart.css";

function CompassCenter(props) {
  const { origin } = props;

  const orange = { base: "#84CEB2", highlight: "#CCFF00" };
  const red = { base: "#4D7D6B", highlight: "#10573C" };
  const innerRadius = 30;

  /* 안쪽 원 스타일 */
  /* ======================= */  
  /*
    cx = 중심원 x축 위치 : origin.x = 바깥 원 x축 위치와 동일
    cy = 중심원 y축 위치 : origin.y = 바깥 원 y축 위치와 동일
  */
  /* ======================= */ 
  const circleStyle = {
    stroke: red.base, strokeWidth: 1, fill: orange.base
  };
  
  return (
    <g>
      <circle
        cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
      />
    </g>
  );
}

function CenterLabel(props) {
  const { active, color, data, index } = props;
  const campaignCategory = data[index].campaignCategory;
  const currentPercentage = Math.round(data[index].currentBudget / data[index].goalBudget * 100); 
  const text = [ `${campaignCategory}`, `달성률 : ${currentPercentage}%` ];
  const baseStyle = { fill: color.highlight, textAnchor: "middle" };
  const style = [
    { ...baseStyle, fontSize: 18, fontWeight: "bold" },
    { ...baseStyle, fontSize: 12 }
  ];

  return active ?
    (
      <VictoryLabel
        text={text} style={style} x={225} y={158} renderInPortal
      />
    ) : null;
}

function TestChart() {

  const categoryData = [
    {
      campaignCategory: "재난", campaings: 15, goalBudget: 600000, currentBudget: 400000
    },
    {
      campaignCategory: "지구촌", campaings: 35, goalBudget: 500000, currentBudget: 350000
    },
    {
      campaignCategory: "아동", campaings: 20, goalBudget: 800000, currentBudget: 250000
    },
    {
      campaignCategory: "노인", campaings: 10, goalBudget: 300000, currentBudget: 200000
    },
    {
      campaignCategory: "소외", campaings: 9, goalBudget: 220000, currentBudget: 200000
    }
  ];
      
  const orange = { base: "#E4FF76", highlight: "#006140" };
  const red = { base: "#B2FF7E", highlight: "#006140" };
  const innerRadius = 30;

  const roundAxisStyle = {
    axis: {stroke: "#10573C", strokeWidth: 3},
    axisLabel: {fontSize: 14, padding: 36, fill: "#10573C"},
    tickLabels: {fontSize: 15, padding: 4, fill: "#10573C"}
  } 

  const radiusAxisStyle = {
    axis: { stroke: "none" }
  }
  
  return (
    <div className='chartbox'>
      <h4>카테고리별 목표 모금액 대비 달성률</h4>
      <VictoryChart
        polar
        animate={{ duration: 500, onLoad: { duration: 500 } }}
        innerRadius={innerRadius}
        domainPadding={{ y: 5 }}
        containerComponent={
          <VictoryVoronoiContainer 
            style={{width: 1000, height: 500}}
          />
        }
        events={
          [
            {
              childName: "all",
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    { target: "labels", mutation: () => ({ active: true }) },
                    { target: "data", mutation: () => ({ active: true }) }
                  ];
                },
                onMouseOut: () => {
                  return [
                    { target: "labels", mutation: () => ({ active: false }) },
                    { target: "data", mutation: () => ({ active: false }) }
                  ];
                }
              }
            }
          ]
        }
      >
        <VictoryPolarAxis
          dependentAxis
          labelPlacement="vertical"
          style={radiusAxisStyle}
          tickFormat={() => ""}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={[1,2,3,4,5]}
          tickFormat={["재난", "지구촌", "아동", "노인", "소외"]}
          style={roundAxisStyle}
        />
        <VictoryStack>
          <VictoryBar
            style={
              { 
                data: {
                  fill: ({ active }) => active ? orange.highlight : orange.base,
                  width: 40
                } 
              }
            }
            data={categoryData}
            x="campaignCategory"
            y="currentBudget"
            labels={() => ""}
            labelComponent={<CenterLabel color={orange}/>}
          />
          <VictoryBar
            style={
              { 
                data: {
                  fill: ({ active }) => active ? red.highlight : red.base,
                  width: 40
                } 
              }
            }
            data={categoryData}
            x="campaignCategory"
            y="goalBudget"
            labels={() => ""}
            labelComponent={<CenterLabel color={red}/>}
          />
        </VictoryStack>
        <CompassCenter/>
      </VictoryChart>
    </div>
  );
}
export default TestChart;