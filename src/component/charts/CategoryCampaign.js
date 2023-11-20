import {VictoryBar, VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryPolarAxis, VictoryStack} from 'victory';
import "../../assets/css/chart.css";

/* chart figure */ 
const width = 1500;
const height = 700;

/* 안쪽 원 반지름 + y축 도넛 안쪽 반지름 */ 
const innerRadius = 130;

function InnerCircle({ origin }) {
    const yellowColorSet = { base: "#E4FF76", highlight: "#D8DC35" };
    const greenColorSet = { base: "#B2FF7E", highlight: "#92D930" };

    
    const circleStyle = {
        stroke: greenColorSet.base, strokeWidth: 3, fill: yellowColorSet.base
    };
  
    return (
        <g>
            <circle
                cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
            />
        </g>
    );
}

function CenterLabel({ active, datum }) {
    
    const campaignCategory = datum.campaignCategory;
    const currentBudget = datum.currentBudget;
    const goalBudget = datum.goalBudget;
    const cursorY1 = datum._y1;

    const changeText = cursorY1 === goalBudget ? "목표" : "현재";
    const currentPercentage = Math.round(currentBudget / goalBudget * 100); 

    const text = [ `${campaignCategory} ${changeText}모금액: ${cursorY1/10000}만원`, `달성률 : ${currentPercentage}%` ];

    const baseStyle = { fill: "#10573C", textAnchor: "middle" };
    const style = [
        { ...baseStyle, fontSize: 24, fontWeight: "bold" },
        { ...baseStyle, fontSize: 20 }
    ];

    return active ? 
    (
      <VictoryLabel
        text={text} style={style} x={width/2} y={height/2} renderInPortal
      />
    ) : null;
}

const attributes = ["재난", "지구촌", "아동", "노인", "소외"];

function CategoryCampaign(chartDataList) {
    console.log('CategoryCampaign Data?', chartDataList)

    /* chartData from API */
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
            campaignCategory: "소외", campaings: 9, goalBudget: 220000,   currentBudget: 200000, expectBudget: 20000
        }
    ];
      
    const yellowColorSet = { base: "#E4FF76", highlight: "#D8DC35" };
    const greenColorSet = { base: "#B2FF7E", highlight: "#92D930" };

    const mouseEventHandler = [
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

    /* y축 (반지름) */
    const radiusAxisStyle = {
        axis: { stroke: "#10573C" },
    }

    /* x축 (둘레) */
    const roundAxisStyle = {
        axis: {stroke: "#10573C", strokeWidth: 3},
        tickLabels: {fontSize: 20, padding: 20, fill: "#10573C"}
    } 

    const barWidth = 110;
    const innerBarChartStyle = { 
        data: {
            fill: ({ active }) => active ? yellowColorSet.highlight : yellowColorSet.base,
            width: barWidth
        } 
    }

    const outerBarChartStyle = {
        data: {
            fill: ({ active }) => active ? greenColorSet.highlight : greenColorSet.base,
            width: barWidth
        } 
    }
  
    /* render */
    return (
        <div className='chartbox'>
            <h4>카테고리별 목표 모금액 대비 달성률</h4>
            <VictoryChart
                polar
                width={width} height={height}
                innerRadius={innerRadius}
                domainPadding={{ y: 15 }}
                containerComponent={
                <VictoryVoronoiContainer />
                }
                events={mouseEventHandler}
            >
                <VictoryPolarAxis
                    labelPlacement="perpendicular"
                    tickValues={[1,2,3,4,5]}
                    tickFormat={attributes}
                    style={roundAxisStyle}
                />
                {attributes.map((attribute, index) => (
                    <VictoryPolarAxis dependentAxis
                    key={index}
                    labelPlacement="parallel"
                    style={radiusAxisStyle}
                    axisValue={attribute}
                    tickFormat={() => ""}
                    />
                ))}
                <VictoryStack>
                    <VictoryBar
                        style={innerBarChartStyle}
                        data={categoryData}
                        x="campaignCategory"
                        y="currentBudget"
                        labels={() => ""}
                        labelComponent={<CenterLabel color={yellowColorSet}/>}
                    />
                    <VictoryBar
                        style={outerBarChartStyle}
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
export default CategoryCampaign;