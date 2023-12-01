import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";

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
  const stringY = 'allCampaigns';
  const stringY2 = 'childCampaigns';
  const stringY3 = 'olderCampaigns';
  /*
  const stringY4 = 'etcCampaigns';
  const stringY5 = 'animalCampaigns';
  const stringY6 = 'natureCampaigns';
  */

  /* style setting */
  const baseFillStyle = { fill: "#10573C" }

  const axisStyle = {
      axis: { stroke: "#10573C", strokeWidth: 2 },
      axisLabel: { fontSize: 20, padding: 36, ...baseFillStyle },
      tickLabels: { fontSize: 20, padding: 10, ...baseFillStyle }
  }

  const toolTipStyle = {
      fontSize: 20, 
      ...baseFillStyle
  }

  /* render */
  return (
    <div className='chartbox'>
      <h4>당해 등록된 캠페인 수</h4>
      <VictoryChart 
        width={width} height={height}
        padding={chartPadding}
        domainPadding={50} 
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
          color="#10573C"
          labels={({ datum }) => `총 ${datum._y}건`}
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
            x={stringX}
            y={stringY}
          />
          <VictoryScatter 
            x={stringX}
            y={stringY}
            size={({ active }) => active ? 8 : 3}
          />
        </VictoryGroup>
        <VictoryGroup
          color="#000000"
          labels={({ datum }) => `아동-청소년 ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={toolTipStyle}
            />
          }
          data={chartDataList}
          x={stringX}
          y={stringY2}
        >
          <VictoryLine
            x={stringX}
            y={stringY2}
          />
          <VictoryScatter 
            x={stringX}
            y={stringY2}
            size={({ active }) => active ? 8 : 3}
          />
        </VictoryGroup>
        <VictoryGroup
          color="#000000"
          labels={({ datum }) => `어르신 ${datum._y}건`}
          labelComponent={
            <VictoryTooltip
              style={toolTipStyle}
            />
          }
          data={chartDataList}
          x={stringX}
          y={stringY3}
        >
          <VictoryLine
            x={stringX}
            y={stringY3}
          />
          <VictoryScatter 
            x={stringX}
            y={stringY3}
            size={({ active }) => active ? 8 : 3}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default CurrentYearCampaign;