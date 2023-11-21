import { useState } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryBrushContainer, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, VictoryTooltip } from "victory"
import "../../assets/css/chart.css"

function HistoryChart(chartDataListProps) {

    /* chartData from API */
    
    const { chartDataList } = chartDataListProps;
    
    const [zoomDomain, setZoomDomain] = useState({
        zoomDomain: {
            x: [new Date('2023-09-01'), new Date('2023-12-31')],
            y: [0, 5000000]
        }
    });

    const zoomDomainHandler = (domain) => setZoomDomain(domain);

    /* TestData */ 
    /*
    const testData = [
        {
            donationDate: 1700035529000, campaigns: 10, donationPoint: 25000, sumGoalBudget: 50000, sumExpectBudget: 25000
        },
        {
            donationDate: 1700130137000, campaigns: 8, donationPoint: 50000, sumGoalBudget: 100000, sumExpectBudget: 50000
        },
        {
            donationDate: 1700284100000, campaigns: 2, donationPoint: 70000, sumGoalBudget: 150000, sumExpectBudget: 80000
        },
        {
            donationDate: 1700292445000, campaigns: 9, donationPoint: 20000, sumGoalBudget: 50000, sumExpectBudget: 30000
        },
        {
            donationDate: 1700535240000, campaigns: 5, donationPoint: 30000, sumGoalBudget: 80000, sumExpectBudget: 50000
        },
        {
            donationDate: 1700535349000, campaigns: 3, donationPoint: 10000, sumGoalBudget: 31233, sumExpectBudget: 21233
        }
    ];
    */
    
    /* chart figure */ 
    const width = 1500;
    const height = 700;
    const brushChartHeight = 200;
    const brushTickValues = [new Date('2023-11-15'), new Date('2023-11-21')];

    /* x축, y축 기준 설정 */
    const stringX = 'donationDate';
    const stringY = 'donationPoint';
    
    /* style setting */
    const baseFillStyle = { fill: "#10573C" }
    const baseStrokeStyle = { stroke: "#10573C" }

    const toolTipStyle = {
        fontSize: 20, 
        ...baseFillStyle
    }

    const lineAndScatterStyle = {
        data: { ...baseStrokeStyle }
    }

    const axisStyle = {
        axis: { ...baseStrokeStyle , strokeWidth: 3 },
        axisLabel: { fontSize: 14, padding: 36, ...baseFillStyle },
        tickLabels: { fontSize: 16, padding: 4, ...baseFillStyle }
    }
    
    /* render */ 
    return (
        <div className='chartbox'>
            <h4>일별 모금액 추이</h4>
            <VictoryChart
                width={width} height={height}
                domainPadding={{x: 50, y: 50}} 
                // scale={{ x: "time" }}
                containerComponent={
                    <VictoryZoomContainer
                        // responsive={false}
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        minimumZoom={{x: 1, y: 0}}
                        // allowZoom={false}
                        onZoomDomainChange={zoomDomainHandler}
                    />
                }
            >
                <VictoryAxis
                    style={axisStyle}
                    tickFormat={(x) => `${new Date(x).getFullYear()}년${new Date(x).getMonth() + 1}월${new Date(x).getDate()}일`}
                />
                <VictoryAxis 
                    dependentAxis
                    tickFormat={(x) => `${x}원`}
                    style={axisStyle}
                />
                <VictoryGroup
                    color="#10573C"
                    labels={({ datum }) => `${new Date(datum._x).getFullYear()}년${new Date(datum._x).getMonth() + 1}월${new Date(datum._x).getDate()}일${new Date(datum._x).getHours()}시${new Date(datum._x).getMinutes()}분${new Date(datum._x).getSeconds()}초, ${datum._y}원`}
                    labelComponent={
                        <VictoryTooltip
                            style={toolTipStyle}
                        />
                    }
                    data={chartDataList}
                    x={stringX}
                    y={stringY}
                >
                    <VictoryLine
                        style={lineAndScatterStyle}
                        x={stringX}
                        y={stringY}
                    />
                    <VictoryScatter
                        style={lineAndScatterStyle}
                        x={stringX}
                        y={stringY}
                        size={5}
                    />
                </VictoryGroup>
            </VictoryChart>
            <VictoryChart
                padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                domainPadding={{x: 50, y: 10}}
                width={width} height={brushChartHeight}
                // scale={{ x: "time" }}
                containerComponent={
                    <VictoryBrushContainer
                        // responsive={false}
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={zoomDomainHandler}   
                    />
                }
            >
                <VictoryAxis
                    tickValues={brushTickValues}
                    tickFormat={(x) => `${new Date(x).getFullYear()}년${new Date(x).getMonth() + 1}월`}
                    style={axisStyle}
                />
                <VictoryLine
                    style={lineAndScatterStyle}
                    data={chartDataList}
                    x={stringX}
                    y={stringY}
                />
                
            </VictoryChart>
        </div>
    );
}

export default HistoryChart;