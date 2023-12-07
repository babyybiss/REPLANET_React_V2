import {VictoryBar, VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryPolarAxis, VictoryStack} from 'victory';
import { numberFormatToKorean } from "../../../utils/NumberFormatToKorean";
import '../../../assets/css/chart.css';

/* chart common figure */
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
    const cursorY1 = datum._y1;
    const currentPercentage = datum.progress;

    const changeText = cursorY1 === sumGoalBudget ? "목표" : "현재";

    
    const labelText = [ `${campaignCategory} ${changeText}모금액: ${numberFormatToKorean(cursorY1)}원`, `달성률 : ${currentPercentage}%` ];

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

function CategoryChart(dataProps) {
    const { byCategory } = dataProps;

    const tickValuesAttributes = byCategory.map((_, index) => index + 1);
    const tickFormatAttributes = byCategory.map(categoryname => categoryname.campaignCategory)
    
    /* x축(round), y축(radius) 기준 설정 */
    const stringX = 'campaignCategory';
    const stringY1 = 'sumCurrentBudget';
    const stringY2 = 'sumExpectBudget';

    /* Event function setting */
    const mouseEventHandler = [
        {
            childName: "all",
            target: "data",
            eventHandlers: {
                onMouseOver: () => {
                    return [
                        { 
                            target: "labels", 
                            mutation: () => ({ active: true })
                        },
                        { 
                            target: "data", 
                            mutation: () => ({ active: true }) 
                        }
                    ];
                },
                onMouseOut: () => {
                    return [
                        { 
                            target: "labels", 
                            mutation: () => ({ active: false }) 
                        },
                        { 
                            target: "data", 
                            mutation: () => ({ active: false }) 
                        }
                    ];
                }
            }
        }
    ]

    /* ---------- style setiing start ---------- */ 

    /* 1. axis style */
    const radiusAxisStyle = {
        axis: { stroke: "#10573C", strokeWidth: 0.6 }
    }
    const roundAxisStyle = {
        axis: { stroke: "#10573C", strokeWidth: 2 },
        tickLabels: { fontSize: 20, padding: 20, fill: "#10573C" }
    } 

    /* 2. bar style */ 
    const barWidth = 100;
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
  
    /* ---------- style setiing end ---------- */

    return (
        <div className='chart-box'>
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
                        data={byCategory}
                        x={stringX}
                        y={stringY1}
                        labels={() => ""}
                        labelComponent={
                            <CenterLabel 
                                color={yellowColorSet}
                            />
                        }
                    />
                    <VictoryBar
                        style={outerBarChartStyle}
                        data={byCategory}
                        x={stringX}
                        y={stringY2}
                        labels={() => ""}
                        labelComponent={
                            <CenterLabel 
                                color={greenColorSet}
                            />
                        }
                    />
                </VictoryStack>
                <InnerCircle/>
            </VictoryChart>
        </div>
    );
}
export default CategoryChart;