import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";

function PreviousYearCampaign(chartDataListProps) {
  
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
  const stringY = 'campaigns';

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

  /* chart animate setting */ 
  /*
  const chartAminate = {
    duration: 2500, 
    onLoad: { duration: 2500 }
  }
  */

  /* render */
  return(
    <div className='chartbox'>
      <h4>전해 등록된 캠페인 수</h4>
      <VictoryChart 
        width={width} height={height}
        padding={chartPadding}
        domainPadding={50}
        containerComponent={
          <VictoryVoronoiContainer />
        }
      > 
        <VictoryAxis
          tickValues={tickValuesAttributes}
          tickFormat={tickFormatAttributes}
          style={axisStyle}
        />
        <VictoryAxis 
          dependentAxis
          tickFormat={(x) => (`${x}건`)}
          style={axisStyle}
        />
        <VictoryGroup
          color="#10573C"
          labels={({ datum }) => `${datum._y}건`}
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
            // animate={chartAminate}
          />
          <VictoryScatter 
            x={stringX}
            y={stringY}
            size={({ active }) => active ? 8 : 3}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default PreviousYearCampaign;