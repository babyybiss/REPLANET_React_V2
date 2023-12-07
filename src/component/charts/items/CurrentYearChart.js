import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import { CustomFlyoutY1, CustomFlyoutY2, CustomFlyoutY3, CustomFlyoutY4, CustomFlyoutY5, CustomFlyoutY6 } from './currentYearCampaign/CurrentYearTooltips';
import { lineStyleY1, lineStyleY2, lineStyleY3, lineStyleY4, lineStyleY5, lineStyleY6, scatterStyleY1, scatterStyleY2, scatterStyleY3, scatterStyleY4, scatterStyleY5, scatterStyleY6  } from './currentYearCampaign/CurrentYearDataStyles';

function CurrentYearChart(dataProps) {

    const { currentYearData } = dataProps;

    const tickValuesAttributes = Array.from({ length: 12 }, (_, index) => 1 + (1 * index));
    const tickFormatAttributes = tickValuesAttributes.map(monthlyName => `${monthlyName}월`)
    
    /* chart figure */ 
    const width = 1500;
    const height = 700;

    /* chart padding */ 
    const chartPadding = { left: 100, right: 50, top: 50, bottom: 50 }

    /* x축, y축 기준 설정 */
    const stringX = 'monthly';
    const standardDataY = ['allCampaigns', 'childCampaigns', 'olderCampaigns', 'etcCampaigns', 'animalCampaigns', 'natureCampaigns']
    
    const campaignCategoryArray = ['총','아동-청소년', '어르신', '기타', '동물', '환경보호'];

    /* Event function setting */ 
    const mouseEventsHandler = [
        {
        childName: "all",
        target: "data",
        eventHandlers: {
            onMouseOver: () => {
            return [
                {
                target: "data",
                mutation: () => ({ active : true }) 
                }
            ];
            },
            onMouseOut: () => {
            return [
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

    /* 데이터 컬러 프리셋 */ 
    const dataColorSet = ["#10573C", "#ff9f40", "#ff6384", "#ffcd56", "#36a2eb", "#9966ff"];    

    /* 1. axis style */
    const baseFillStyle = { fill: "#10573C" }
    const baseStrokeAndWidth = { stroke: "#10573C", strokeWidth: 2 }
    const baseToolTipSize = 20

    const axisStyle = {
        axis: { ...baseStrokeAndWidth },
        axisLabel: { fontSize: 20, padding: 36, ...baseFillStyle },
        tickLabels: { fontSize: 20, padding: 10, ...baseFillStyle }
    }

    /* 2. label and tooltip-box style */ 

    /* 차트 크기 비례 라벨 시작하는 x 좌표 */ 
    let startLabelX = (width/6);
    /* 차트 크기 비례 라벨 시작하는 y 좌표 */ 
    let startLabelY = (height/10);
    /* 고정으로 움직일 x 좌표 */ 
    let moveXAmount = 80;
    /* 고정으로 움직일 y 좌표 */ 
    let moveYAmount = 18;
    /* 표시할 라벨의 갯수 */ 
    let labetAmount = 6;
    /* 툴팁 박스 간격 */ 
    let tooltipInterval = 35;
    /* tooltipInterval을 적용할 툴팁 박스의 갯수 */
    let tooltipAmount = 4;

    const labelLocationXSet = Array.from({ length: labetAmount }, (_, index) => startLabelX + (startLabelX * index));
    const tooltipIntervalXSet = Array.from({ length: tooltipAmount }, (_, index) => tooltipInterval + (tooltipInterval * index));
    
    /* ---------- style setiing end ---------- */
    return (
        <div className='chartbox'>
            <h4>당해 등록된 캠페인 수</h4>
            <VictoryChart 
                width={width} height={height}
                padding={chartPadding}
                domainPadding={100} 
                containerComponent={
                    <VictoryVoronoiContainer 
                        events={mouseEventsHandler}
                        voronoiDimension="x"
                    />
                }
            > 
                <VictoryAxis 
                    dependentAxis
                    tickFormat={(x) => `${x}건`}
                    style={axisStyle}
                />
                <VictoryAxis
                    tickValues={tickValuesAttributes}
                    tickFormat={tickFormatAttributes}
                    style={axisStyle}
                />
                <VictoryGroup
                    labels={({ datum }) => `${datum._x}월 ${campaignCategoryArray[0]} ${datum._y}건`}
                    labelComponent={
                        <VictoryTooltip
                            style={{
                                fill: dataColorSet[0],
                                fontSize: 40
                            }}
                            center={{ x: labelLocationXSet[0], y: startLabelY }}
                            flyoutComponent={
                                <CustomFlyoutY1
                                    dataColorSet={dataColorSet}
                                    labelLocationXSet={labelLocationXSet}
                                    tooltipIntervalXSet={tooltipIntervalXSet}
                                    startLabelY={startLabelY}
                                    moveXAmount={moveXAmount}
                                    moveYAmount={moveYAmount}
                                    width={width}
                                    height={height}
                                />
                            }
                        />
                    }
                    data={currentYearData}
                    x={stringX}
                    y={standardDataY[0]}
                >
                    <VictoryLine
                        x={stringX}
                        y={standardDataY[0]}
                        style={lineStyleY1}
                    />
                    <VictoryScatter 
                        x={stringX}
                        y={standardDataY[0]}
                        style={scatterStyleY1}
                    />
                </VictoryGroup>
                <VictoryGroup
                    labels={({ datum }) => `${campaignCategoryArray[1]} ${datum._y}건`}
                    labelComponent={
                        <VictoryTooltip
                            style={{
                                fill: dataColorSet[1],
                                fontSize: baseToolTipSize
                            }}
                            center={{x: labelLocationXSet[1], y: startLabelY }}
                            flyoutComponent={
                                <CustomFlyoutY2
                                    dataColorSet={dataColorSet}
                                    labelLocationXSet={labelLocationXSet}
                                    tooltipIntervalXSet={tooltipIntervalXSet}
                                    startLabelY={startLabelY}
                                    moveXAmount={moveXAmount}
                                    moveYAmount={moveYAmount}
                                    width={width}
                                    height={height}
                                />
                            }
                        />
                    }
                    data={currentYearData}
                    x={stringX}
                    y={standardDataY[1]}
                >
                    <VictoryLine
                        x={stringX}
                        y={standardDataY[1]}
                        style={lineStyleY2}
                    />
                    <VictoryScatter 
                        x={stringX}
                        y={standardDataY[1]}
                        style={scatterStyleY2}
                    />
                </VictoryGroup>
                <VictoryGroup
                    labels={({ datum }) => `${campaignCategoryArray[2]} ${datum._y}건`}
                    labelComponent={
                        <VictoryTooltip
                            style={{
                                fill: dataColorSet[2],
                                fontSize: baseToolTipSize
                            }}
                            center={{ x: labelLocationXSet[2], y: startLabelY }}
                            flyoutComponent={
                                <CustomFlyoutY3
                                    dataColorSet={dataColorSet}
                                    labelLocationXSet={labelLocationXSet}
                                    tooltipIntervalXSet={tooltipIntervalXSet}
                                    startLabelY={startLabelY}
                                    moveXAmount={moveXAmount}
                                    moveYAmount={moveYAmount}
                                    width={width}
                                    height={height}
                                />
                            }
                        />
                    }
                    data={currentYearData}
                    x={stringX}
                    y={standardDataY[2]}
                >
                    <VictoryLine
                        x={stringX}
                        y={standardDataY[2]}
                        style={lineStyleY3}
                    />
                    <VictoryScatter 
                        x={stringX}
                        y={standardDataY[2]}
                        style={scatterStyleY3}
                    />
                </VictoryGroup>
                <VictoryGroup
                    labels={({ datum }) => `${campaignCategoryArray[3]} ${datum._y}건`}
                    labelComponent={
                        <VictoryTooltip
                            style={{
                                fill: dataColorSet[3],
                                fontSize: baseToolTipSize
                            }}
                            center={{ x: labelLocationXSet[3], y: startLabelY }}
                            flyoutComponent={
                                <CustomFlyoutY4 
                                    dataColorSet={dataColorSet}
                                    labelLocationXSet={labelLocationXSet}
                                    tooltipIntervalXSet={tooltipIntervalXSet}
                                    startLabelY={startLabelY}
                                    moveXAmount={moveXAmount}
                                    moveYAmount={moveYAmount}
                                    width={width}
                                    height={height}
                                />
                            }
                        />
                    }
                    data={currentYearData}
                    x={stringX}
                    y={standardDataY[3]}
                >
                    <VictoryLine
                        x={stringX}
                        y={standardDataY[3]}
                        style={lineStyleY4}
                    />
                    <VictoryScatter 
                        x={stringX}
                        y={standardDataY[3]}
                        style={scatterStyleY4}
                    />
                </VictoryGroup>
                <VictoryGroup
                    labels={({ datum }) => `${campaignCategoryArray[4]} ${datum._y}건`}
                    labelComponent={
                        <VictoryTooltip
                            style={{
                                fill: dataColorSet[4],
                                fontSize: baseToolTipSize
                            }}
                            center={{ x: labelLocationXSet[4], y: startLabelY }}
                            flyoutComponent={
                                <CustomFlyoutY5
                                    dataColorSet={dataColorSet}
                                    labelLocationXSet={labelLocationXSet}
                                    tooltipIntervalXSet={tooltipIntervalXSet}
                                    startLabelY={startLabelY}
                                    moveXAmount={moveXAmount}
                                    moveYAmount={moveYAmount}
                                    width={width}
                                    height={height}
                                />
                            }
                        />
                    }
                    data={currentYearData}
                    x={stringX}
                    y={standardDataY[4]}
                >
                    <VictoryLine
                        x={stringX}
                        y={standardDataY[4]}
                        style={lineStyleY5}
                    />
                    <VictoryScatter 
                        x={stringX}
                        y={standardDataY[4]}
                        style={scatterStyleY5}
                    />
                </VictoryGroup>
                <VictoryGroup
                    labels={({ datum }) => `${campaignCategoryArray[5]} ${datum._y}건`}
                    labelComponent={
                        <VictoryTooltip
                            style={{
                                fill: dataColorSet[5],
                                fontSize: baseToolTipSize
                            }}
                            center={{ x: labelLocationXSet[5], y: startLabelY }}
                            flyoutComponent={
                                <CustomFlyoutY6
                                    dataColorSet={dataColorSet}
                                    labelLocationXSet={labelLocationXSet}
                                    tooltipIntervalXSet={tooltipIntervalXSet}
                                    startLabelY={startLabelY}
                                    moveXAmount={moveXAmount}
                                    moveYAmount={moveYAmount}
                                    width={width}
                                    height={height}
                                />
                            }
                        />
                    }
                    data={currentYearData}
                    x={stringX}
                    y={standardDataY[5]}
                >
                    <VictoryLine
                        x={stringX}
                        y={standardDataY[5]}
                        style={lineStyleY6}
                    />
                    <VictoryScatter 
                        x={stringX}
                        y={standardDataY[5]}
                        style={scatterStyleY6}
                    />
                </VictoryGroup>
            </VictoryChart>
        </div>
    );
}
export default CurrentYearChart;