import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";
import { CustomFlyoutY4, CustomFlyoutY5, CustomFlyoutY6 } from './items/CurrentYearTooltips';

/* customToolTipBox */ 
/*
function CustomFlyout(flyoutComponentProps) {
  const {x, y} = flyoutComponentProps;
  const newX = x - 200;
  const newY = y - 200;

  return (
    <g>
      <rect width="90" height="40" x={newX} y={newY} rx={5} stroke="#10573C" fill="none" strokeWidth={1}></rect>
    </g>
  );
}
*/

function CurrentYearCampaign(chartDataListProps) {

  /* chartData from API */
  
  const { chartDataList } = chartDataListProps;

  const tickValuesAttributes = chartDataList.map((attribute, index) => index + 1);
  const tickFormatAttributes = chartDataList.map(monthlyName => `${monthlyName.monthly}월`)
  
  /* chart figure */ 
  const width = 1500;
  const height = 700;

  /* chart padding */ 
  const chartPadding = { left: 100, right: 50, top: 50, bottom: 50 }

  /* x축, y축 기준 설정 */
  const stringX = 'monthly';
  const standardDataY = ['allCampaigns', 'childCampaigns', 'olderCampaigns', 'etcCampaigns', 'animalCampaigns', 'natureCampaigns']
  const campaignCategoryArray = ['총','아동-청소년', '어르신', '기타', '동물', '환경보호'];
  

  /* style setting */
  const baseFillStyle = { fill: "#10573C" }
  const baseStrokeAndWidth = { stroke: "#10573C", strokeWidth: 2 }
  const baseToolTipSize = 20

  const axisStyle = {
    axis: { ...baseStrokeAndWidth },
    axisLabel: { fontSize: 20, padding: 36, ...baseFillStyle },
    tickLabels: { fontSize: 20, padding: 10, ...baseFillStyle }
  }
  /* 라벨(글자) 위치 */ 
  const labelLocationYSet = [0, 0, 0, 45, 80, 115]

  /* color set */ 
  const dataColorSet = ["#10573C", "#ff9f40", "#ff6384", "#ffcd56", "#36a2eb", "#9966ff"];



  /* render */
  return (
    <div className='chartbox'>
      <h4>당해 등록된 캠페인 수</h4>
      <VictoryChart 
        width={width} height={height}
        padding={chartPadding}
        domainPadding={100} 
        containerComponent={
          <VictoryVoronoiContainer />
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
          color= {dataColorSet[0]}
          labels={({ datum }) => `${campaignCategoryArray[0]} ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={{
                fill: dataColorSet[0],
                fontSize: baseToolTipSize
              }}
              dy={labelLocationYSet[0]}
            />
          }
          data={chartDataList}
          x={stringX}
          y={standardDataY[0]}
        >
          <VictoryLine
            x={stringX}
            y={standardDataY[0]}
          />
          <VictoryScatter 
            x={stringX}
            y={standardDataY[0]}
            /*
            size={({ active }) => 
              active ? 8 : 3
            }
            */
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
              dy={labelLocationYSet[1]}
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
              dy={labelLocationYSet[2]}
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
              dy={labelLocationYSet[3]}
              flyoutComponent={
                <CustomFlyoutY4 dataColorSet={dataColorSet}
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
              dy={labelLocationYSet[4]}
              flyoutComponent={
                <CustomFlyoutY5
                  dataColorSet={dataColorSet}
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
              dy={labelLocationYSet[5]}
              flyoutComponent={
                <CustomFlyoutY6
                  dataColorSet={dataColorSet}
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