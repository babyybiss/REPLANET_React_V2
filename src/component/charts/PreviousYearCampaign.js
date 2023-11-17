import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";

function PreviousYearCampaign() {

    /* chartData from API */ 
    const monthlyData = [
        {
          monthly: 1, campaings: 12
        },
        {
          monthly: 2, campaings: 20
        },
        {
          monthly: 3, campaings: 20
        },
        {
          monthly: 4, campaings: 34
        },
        {
          monthly: 5, campaings: 15
        },
        {
          monthly: 6, campaings: 34
        },
        {
          monthly: 7, campaings: 22
        },
        {
          monthly: 8, campaings: 5
        },
        {
          monthly: 9, campaings: 6
        },
        {
          monthly: 10, campaings: 8
        },
        {
          monthly: 11, campaings: 9
        },
        {
          monthly: 12, campaings: 8
        }
      ];

      /* chart figure */ 
      const width = 1500;
      const height = 700;

      /* style setting */ 
      const axisStyle = {
        axis: {stroke: "#10573C", strokeWidth: 3},
        axisLabel: {fontSize: 14, padding: 36, fill: "#10573C"},
        tickLabels: {fontSize: 18, padding: 4, fill: "#10573C"}
      }

      const toolTipStyle = {
        fontSize: 20, 
        fill: "#10573C"
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
                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                tickFormat={["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]}
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
                labels={({ datum }) => `${datum.campaings}건`}
                labelComponent={
                  <VictoryTooltip
                    style={toolTipStyle}
                  />
                }
                data={monthlyData}
                x="monthly" 
                y="campaings"
              >
                <VictoryLine
                  x="monthly" 
                  y="campaings"
                  // animate={chartAminate}
                />
                <VictoryScatter 
                  x="monthly" 
                  y="campaings"
                  size={({ active }) => active ? 8 : 3}
                />
              </VictoryGroup>
            </VictoryChart>
        </div>
    );
}

export default PreviousYearCampaign;