import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";
import { CustomFlyoutY1, CustomFlyoutY2, CustomFlyoutY3, CustomFlyoutY4, CustomFlyoutY5, CustomFlyoutY6 } from './items/currentYearCampaign/CurrentYearTooltips';

function CurrentYearCampaign(chartDataListProps) {

  /* chartData from API */
  
  const { chartDataList } = chartDataListProps;

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

  /* 2. label style */ 
  let startLabelX = width/7
  let startLabelY = height/10
  let labetAmount = 6;
  const labetLocationXSet = Array.from({ length: labetAmount }, (_, index) => startLabelX + (startLabelX * index));

  /* 3. line style */ 
  const lineStyleTest = {
    data : {
      stroke : dataColorSet[0],
      strokeWidth : ({ active }) => active ? 3 : 2,
      opacity : ({ active }) => active ? 1 : 0.3
    }
  }

  /* 4. scatter style */
  const scatterStyleTest = {
    data : {
      fill : dataColorSet[0],
      opacity : ({ active }) => active ? 1 : 0.3
    }
  } 
  
  /* ---------- style setiing end ---------- */ 

  /* render */
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
          // color= {dataColorSet[0]}
          labels={({ datum }) => `${campaignCategoryArray[0]} ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={{
                fill: dataColorSet[0],
                fontSize: baseToolTipSize
              }}
              center={{ x: labetLocationXSet[0], y: startLabelY }}
              flyoutComponent={
                <CustomFlyoutY1
                  dataColorSet={dataColorSet}
                  labetLocationXSet={labetLocationXSet}
                  startLabelY={startLabelY}
                />
              }
            />
          }
          data={chartDataList}
          x={stringX}
          y={standardDataY[0]}
        >
          <VictoryLine
            x={stringX}
            y={standardDataY[0]}
            style={lineStyleTest}
          />
          <VictoryScatter 
            x={stringX}
            y={standardDataY[0]}
            style={scatterStyleTest}
          />
        </VictoryGroup>
        <VictoryGroup
          color={dataColorSet[1]}
          labels={({ datum }) => `${campaignCategoryArray[1]} ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={{
                fill: dataColorSet[1],
                fontSize: baseToolTipSize
              }}
              center={{x: labetLocationXSet[1], y: startLabelY }}
              flyoutComponent={
                <CustomFlyoutY2
                  dataColorSet={dataColorSet}
                  labetLocationXSet={labetLocationXSet}
                  startLabelY={startLabelY}
                />
              }
            />
          }
          data={chartDataList}
          x={stringX}
          y={standardDataY[1]}
        >
          <VictoryLine
            x={stringX}
            y={standardDataY[1]}
          />
          <VictoryScatter 
            x={stringX}
            y={standardDataY[1]}
          />
        </VictoryGroup>
        <VictoryGroup
          color={dataColorSet[2]}
          labels={({ datum }) => `${campaignCategoryArray[2]} ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={{
                fill: dataColorSet[2],
                fontSize: baseToolTipSize
              }}
              center={{ x: labetLocationXSet[2], y: startLabelY }}
              flyoutComponent={
                <CustomFlyoutY3
                  dataColorSet={dataColorSet}
                  labetLocationXSet={labetLocationXSet}
                  startLabelY={startLabelY}
                />
              }
            />
          }
          data={chartDataList}
          x={stringX}
          y={standardDataY[2]}
        >
          <VictoryLine
            x={stringX}
            y={standardDataY[2]}
          />
          <VictoryScatter 
            x={stringX}
            y={standardDataY[2]}
          />
        </VictoryGroup>
        <VictoryGroup
          color={dataColorSet[3]}
          labels={({ datum }) => `${campaignCategoryArray[3]} ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={{
                fill: dataColorSet[3],
                fontSize: baseToolTipSize
              }}
              center={{ x: labetLocationXSet[3], y: startLabelY }}
              flyoutComponent={
                <CustomFlyoutY4 
                  dataColorSet={dataColorSet}
                  labetLocationXSet={labetLocationXSet}
                  startLabelY={startLabelY}
                />
              }
            />
          }
          data={chartDataList}
          x={stringX}
          y={standardDataY[3]}
        >
          <VictoryLine
            x={stringX}
            y={standardDataY[3]}
          />
          <VictoryScatter 
            x={stringX}
            y={standardDataY[3]}
          />
        </VictoryGroup>
        <VictoryGroup
          color={dataColorSet[4]}
          labels={({ datum }) => `${campaignCategoryArray[4]} ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={{
                fill: dataColorSet[4],
                fontSize: baseToolTipSize
              }}
              center={{ x: labetLocationXSet[4], y: startLabelY }}
              flyoutComponent={
                <CustomFlyoutY5
                  dataColorSet={dataColorSet}
                  labetLocationXSet={labetLocationXSet}
                  startLabelY={startLabelY}
                />
              }
            />
          }
          data={chartDataList}
          x={stringX}
          y={standardDataY[4]}
        >
          <VictoryLine
            x={stringX}
            y={standardDataY[4]}
          />
          <VictoryScatter 
            x={stringX}
            y={standardDataY[4]}
          />
        </VictoryGroup>
        <VictoryGroup
          color={dataColorSet[5]}
          labels={({ datum }) => `${campaignCategoryArray[5]} ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={{
                fill: dataColorSet[5],
                fontSize: baseToolTipSize
              }}
              center={{ x: labetLocationXSet[5], y: startLabelY }}
              flyoutComponent={
                <CustomFlyoutY6
                  dataColorSet={dataColorSet}
                  labetLocationXSet={labetLocationXSet}
                  startLabelY={startLabelY}
                />
              }
            />
          }
          data={chartDataList}
          x={stringX}
          y={standardDataY[5]}
        >
          <VictoryLine
            x={stringX}
            y={standardDataY[5]}
          />
          <VictoryScatter 
            x={stringX}
            y={standardDataY[5]}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default CurrentYearCampaign;