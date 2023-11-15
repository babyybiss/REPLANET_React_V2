import {VictoryVoronoiContainer, VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip} from 'victory';
import "../../assets/css/chart.css";

function CurrentYearCampaign() {

    /* chartData from API */
    const monthlyData = [
        {
          monthly: 1, campaings: 5
        },
        {
          monthly: 2, campaings: 15
        },
        {
          monthly: 3, campaings: 2
        },
        {
          monthly: 4, campaings: 3
        },
        {
          monthly: 5, campaings: 4
        },
        {
          monthly: 6, campaings: 5
        },
        {
          monthly: 7, campaings: 1
        },
        {
          monthly: 8, campaings: 0
        },
        {
          monthly: 9, campaings: 6
        },
        {
          monthly: 10, campaings: 8
        },
        {
          monthly: 11, campaings: 1
        },
        {
          monthly: 12, campaings: 2
        }
    ];

    /* style setting */
    const containerStyle = {
        width: 1000, 
        height: 500
    }

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
    const chartAminate = {
        duration: 2000, 
        onLoad: { duration: 1000 }
    }

    /* render */
    return (
        <div className='chartbox'>
            <h4>당해 등록된 캠페인 수</h4>
            <VictoryChart 
              domainPadding={50} 
              width={1000} height={500}
              containerComponent={
                <VictoryVoronoiContainer 
                  style={containerStyle}
                />
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
                  animate={chartAminate}
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

export default CurrentYearCampaign;