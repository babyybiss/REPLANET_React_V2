import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";

function PreviousYearCampaign(chartDataListProps) {
  
  /* chartData from API */
  
  const { chartDataList } = chartDataListProps;

  const tickValuesAttributes = chartDataList.map((attribute, index) => index + 1);
  const tickFormatAttributes = chartDataList.map(monthlyName => `${monthlyName.monthly}월`)
  
  /* TestData */
  /*
  const monthlyData = [
    {
      monthly: 1, campaigns: 12
    },
    {
      monthly: 2, campaigns: 20
    },
    {
      monthly: 3, campaigns: 20
    },
    {
      monthly: 4, campaigns: 34
    },
    {
      monthly: 5, campaigns: 15
    },
    {
      monthly: 6, campaigns: 34
    },
    {
      monthly: 7, campaigns: 22
    },
    {
      monthly: 8, campaigns: 5
    },
    {
      monthly: 9, campaigns: 6
    },
    {
      monthly: 10, campaigns: 8
    },
    {
      monthly: 11, campaigns: 9
    },
    {
      monthly: 12, campaigns: 8
    }
  ];
  
  const tickValuesAttributes = monthlyData.map((attribute, index) => index + 1);
  const tickFormatAttributes = monthlyData.map(monthlyName => `${monthlyName.monthly}월`)
  */

  /* chart figure */ 
  const width = 1500;
  const height = 700;

  /* x축, y축 기준 설정 */
  const stringX = 'monthly';
  const stringY = 'campaigns';

  /* style setting */ 
  const baseFillStyle = { fill: "#10573C" }

  const axisStyle = {
    axis: { stroke: "#10573C", strokeWidth: 3 },
    axisLabel: { fontSize: 14, padding: 36, ...baseFillStyle },
    tickLabels: { fontSize: 18, padding: 4, ...baseFillStyle }
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
          label="단위 : 건"
          tickFormat={(x) => (`${x}`)}
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