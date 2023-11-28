import {VictoryBar, VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryPolarAxis, VictoryStack} from 'victory';
import "../../assets/css/chart.css";

/* chart figure */ 
const width = 1500;
const height = 700;

/* 안쪽 원 반지름 + y축 도넛 안쪽 반지름 */ 
const innerRadius = 130;

/* 도형 fill 컬러 프리셋 */ 
const yellowColorSet = { base: "#E4FF76", highlight: "#D8DC35" };
const greenColorSet = { base: "#B2FF7E", highlight: "#92D930" };

/* 안쪽 원 도형 그리기 함수 */ 
function InnerCircle({ origin }) {
    
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

/* 가운데 라벨 관리 함수 */ 
function CenterLabel({ active, datum }) {
    const campaignCategory = datum.xName;
    const sumGoalBudget = datum.sumGoalBudget;
    const displaySumCurrentBudget = datum.displaySumCurrentBudget;
    const cursorY1 = datum._y1;

    const changeText = cursorY1 === sumGoalBudget ? "목표" : "현재";
    const currentPercentage = Math.round((displaySumCurrentBudget / sumGoalBudget * 100) * 100) / 100; 

    const labelText = [ `${campaignCategory} ${changeText}모금액: ${cursorY1}원`, `달성률 : ${currentPercentage}%` ];

    const baseLabelStyle = { fill: "#10573C", textAnchor: "middle" };
    const completeLabelStyle = [
        { ...baseLabelStyle, fontSize: 24, fontWeight: "bold" },
        { ...baseLabelStyle, fontSize: 20 }
    ];

    return active ? 
    (
      <VictoryLabel
        text={labelText} style={completeLabelStyle} x={width/2} y={height/2} renderInPortal
      />
    ) : null;
}

function CategoryCampaign(chartDataListProps) {

    /* x축(round), y축(radius) 기준 설정 */
    const stringX = 'campaignCategory';
    const stringY1 = 'sumCurrentBudget';
    const stringY2 = (d) => (d.sumGoalBudget-d.displaySumCurrentBudget);

    /* bar 너비 */ 
    const barWidth = 100;

    /* chartData from API */
    
    const { chartDataList } = chartDataListProps;

    const tickValuesAttributes = chartDataList.map((attribute, index) => index + 1);
    const tickFormatAttributes = chartDataList.map(categoryname => categoryname.campaignCategory)
    

    /* TestData */ 
    /*
    const categoryData = [
        {
            campaignCategory: "재난", campaings: 15, sumGoalBudget: 600000, sumCurrentBudget: 400000, sumExpectBudget: 200000
        },
        {
            campaignCategory: "지구촌", campaings: 35, sumGoalBudget: 500000, sumCurrentBudget: 350000, sumExpectBudget: 150000
        },
        {
            campaignCategory: "아동", campaings: 20, sumGoalBudget: 800000, sumCurrentBudget: 800000, sumExpectBudget: 0
        },
        {
            campaignCategory: "노인", campaings: 10, sumGoalBudget: 300000, sumCurrentBudget: 200000, sumExpectBudget: 100000
        },
        {
            campaignCategory: "소외", campaings: 9, sumGoalBudget: 220000, sumCurrentBudget: 200000, sumExpectBudget: 20000
        }
    ];

    const tickValuesAttributes = categoryData.map((attribute, index) => index + 1);
    const tickFormatAttributes = categoryData.map(categoryname => categoryname.campaignCategory)
    */

    /* Event function setting */
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

    /* style setting */
    /* y축 (반지름) */
    const radiusAxisStyle = {
        axis: { stroke: "#10573C" }
    }

    /* x축 (둘레) */
    const roundAxisStyle = {
        axis: { stroke: "#10573C", strokeWidth: 3 },
        tickLabels: { fontSize: 20, padding: 20, fill: "#10573C" }
    } 

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
                    tickValues={tickValuesAttributes}
                    tickFormat={tickFormatAttributes}
                    style={roundAxisStyle}
                />
                {tickFormatAttributes.map((attribute, index) => (
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
                        data={chartDataList}
                        x={stringX}
                        y={stringY1}
                        labels={() => ""}
                        labelComponent={<CenterLabel color={yellowColorSet}/>}
                    />
                    <VictoryBar
                        style={outerBarChartStyle}
                        data={chartDataList}
                        x={stringX}
                        y={stringY2}
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