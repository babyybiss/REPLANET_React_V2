import { useEffect, useState } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryBrushContainer, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, VictoryTooltip } from "victory"
import "../../assets/css/chart.css";
import { dateFormatToKorean } from "../../utils/DateFormatToKorean";
import { numberFormatToKorean } from "../../utils/NumberFormatToKorean";

function HistoryChart(chartDataListProps) {

    /* chartData from API */
    const { chartDataList } = chartDataListProps;
    
    /* zoom 초기값 설정을 위한 변수 세팅 */ 
    const today = new Date();
    const fifteenDaysAgo = new Date();
    const fifteenDaysLater = new Date();

    fifteenDaysAgo.setDate(today.getDate() - 15)
    fifteenDaysLater.setDate(today.getDate() + 15);


    useEffect(() => {
        console.log(chartDataList)
        const donationPointArray = chartDataList.map(point => point.donationPoint) 
        console.log(donationPointArray)

    },[]);

    
    /*
    const diffDays = fifteenDaysLater-fifteenDaysAgo;
    const subNumber = 24 * 60 * 60 * 1000;
    
    console.log(fifteenDaysAgo)
    console.log(fifteenDaysLater)
    console.log(diffDays/subNumber)
    */

    /* zoom state */ 
    const [zoomDomain, setZoomDomain] = useState({
            x: [new Date(fifteenDaysAgo), new Date(fifteenDaysLater)],
            y: [0, 5000000000]
    });
    
    const zoomDomainHandler = (domain) => setZoomDomain(domain);

    /* chart figure */ 
    const width = 1500;
    const height = 700;
    const brushChartHeight = 200;
    const brushTickValues = [new Date(fifteenDaysAgo), new Date(fifteenDaysLater)];

    /* chart padding */ 
    const zoomChartPadding = { left: 100, right: 50, top: 50, bottom: 50 }
    const brushChartPadding = { left: 100, right: 50, top: 0, bottom: 30 }

    /* x축, y축 기준이 될 데이터 설정 */
    const stringX = 'donationDate';
    const stringY = (standardData) => (standardData.donationPoint+standardData.payAmount)
    
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
        axis: { ...baseStrokeStyle , strokeWidth: 2 },
        axisLabel: { fontSize: 20, padding: 36, ...baseFillStyle },
        tickLabels: { fontSize: 20, padding: 8, ...baseFillStyle }
    }
    
    /* render */ 
    return (
        <div className='chartbox'>
            <h4>일별 모금액 추이</h4>
            <VictoryChart
                width={width} height={height}
                padding={zoomChartPadding}
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
                    tickFormat={(x) => dateFormatToKorean(x, false)}
                />
                <VictoryAxis 
                    dependentAxis
                    tickFormat={(x) => `${numberFormatToKorean(x, false)}원`}
                    style={axisStyle}
                />
                <VictoryGroup
                    color="#10573C"
                    labels={({ datum }) => `${dateFormatToKorean(datum._x)}, ${numberFormatToKorean(datum._y)}원`}
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
                padding={brushChartPadding}
                domainPadding={{x: 50, y: 10}}
                width={width} height={brushChartHeight}
                // scale={{ x: "time" }}
                containerComponent={
                    <VictoryBrushContainer
                        // responsive={false}
                        allowDraw={false}
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={zoomDomainHandler}   
                    />
                }
            >
                <VictoryAxis
                    tickValues={brushTickValues}
                    tickFormat={(x) => `${dateFormatToKorean(x, false)}`}
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