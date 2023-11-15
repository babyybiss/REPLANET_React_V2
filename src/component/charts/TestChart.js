import {VictoryBar, VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryPolarAxis, VictoryStack} from 'victory';
import "../../assets/css/chart.css";

function InnerCircle(props) {
  const { origin } = props;

  const yellowColorSet = { base: "#E4FF76", highlight: "#D8DC35" };
  const greenColorSet = { base: "#B2FF7E", highlight: "#92D930" };
  const innerRadius = 30;

  /* 안쪽 원 스타일 */
  /* ======================= */  
  /*
    cx = 중심원 x축 위치 : origin.x = 바깥 원 x축 위치와 동일
    cy = 중심원 y축 위치 : origin.y = 바깥 원 y축 위치와 동일
  */
  /* ======================= */ 
  const circleStyle = {
    stroke: greenColorSet.highlight, strokeWidth: 2, fill: yellowColorSet.base
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
  const { active, data, index } = props;

  const campaignCategory = data[index].campaignCategory;
  const currentBudget = data[index].currentBudget;
  const goalBudget = data[index].goalBudget;

  const currentPercentage = Math.round(currentBudget / goalBudget * 100); 
  const text = [ `${campaignCategory} 목표액: ${goalBudget}`, `달성률 : ${currentPercentage}%` ];
  const baseStyle = { fill: "#10573C", textAnchor: "middle" };
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
      campaignCategory: "재난", campaings: 15, goalBudget: 600000, currentBudget: 400000, expectBudget: 200000
    },
    {
      campaignCategory: "지구촌", campaings: 35, goalBudget: 500000, currentBudget: 350000, expectBudget: 150000
    },
    {
      campaignCategory: "아동", campaings: 20, goalBudget: 800000, currentBudget: 800000, expectBudget: 0
    },
    {
      campaignCategory: "노인", campaings: 10, goalBudget: 300000, currentBudget: 200000, expectBudget: 100000
    },
    {
      campaignCategory: "소외", campaings: 9, goalBudget: 220000, currentBudget: 200000, expectBudget: 20000
    }
  ];
      
  const yellowColorSet = { base: "#E4FF76", highlight: "#D8DC35" };
  const greenColorSet = { base: "#B2FF7E", highlight: "#92D930" };
  const innerRadius = 30;

  const containerStyle = {
    width: 1000, 
    height: 800
  }

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
      <h4>테스트 용</h4>
      <VictoryChart
        polar
        innerRadius={innerRadius}
        domainPadding={{ y: 10 }}
        containerComponent={
          <VictoryVoronoiContainer 
            style={containerStyle}
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
                  fill: ({ active }) => active ? yellowColorSet.highlight : yellowColorSet.base,
                  width: 40
                } 
              }
            }
            data={categoryData}
            x="campaignCategory"
            y="currentBudget"
            labels={() => ""}
            labelComponent={<CenterLabel color={yellowColorSet}/>}
          />
          <VictoryBar
            style={
              { 
                data: {
                  fill: ({ active }) => active ? greenColorSet.highlight : greenColorSet.base,
                  width: 40
                } 
              }
            }
            data={categoryData}
            x="campaignCategory"
            y="expectBudget"
            labels={() => ""}
            labelComponent={<CenterLabel color={greenColorSet}/>}
          />
        </VictoryStack>
        <InnerCircle/>
      </VictoryChart>
    </div>
  );
}
export default TestChart;