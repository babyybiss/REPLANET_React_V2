import {VictoryContainer, VictoryLine, VictoryChart, VictoryAxis} from 'victory';
import "../../assets/css/chart.css";

function PreviousYearCampaign() {

    const monthlyData = [
        {
          monthly: 1, campaings: 12, label: ""
        },
        {
          monthly: 2, campaings: 20, label: ""
        },
        {
          monthly: 3, campaings: 20, label: ""
        },
        {
          monthly: 4, campaings: 34, label: ""
        },
        {
          monthly: 5, campaings: 15, label: ""
        },
        {
          monthly: 6, campaings: 34, label: ""
        },
        {
          monthly: 7, campaings: 22, label: ""
        },
        {
          monthly: 8, campaings: 5, label: ""
        },
        {
          monthly: 9, campaings: 6, label: ""
        },
        {
          monthly: 10, campaings: 8, label: ""
        },
        {
          monthly: 11, campaings: 9, label: ""
        },
        {
          monthly: 12, campaings: 8, label: ""
        }
      ];


      const monthlyDataStyle = {
        data: {
          stroke: "#10573C",
          strokeWidth: 2
        },
        labels: {
          fill: "#10573C",
          fontSize: 20
          //fill: ({ index }) => + index % 2 === 0 ? "#10573C" : "#000000" 
        }
      }
    
      const monthlyChartStyle = {
        background: {
          fill: "#ffffff"
        }
      }
    
      const axisStyle = {
        axis: {stroke: "#10573C", strokeWidth: 3},
        axisLabel: {fontSize: 14, padding: 36, fill: "#10573C"},
        tickLabels: {fontSize: 18, padding: 4, fill: "#10573C"}
      }

      return(
        <div className='chartbox'>
            <h4>전해 등록된 캠페인 수</h4>
            <VictoryChart 
            domainPadding={50} 
            style={monthlyChartStyle}
            width={1000} height={500}
            containerComponent={
            <VictoryContainer style={{width: 1000, height: 500}}/>
            }> 
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
  
              <VictoryLine data={monthlyData} 
              
              style={monthlyDataStyle}
              x="monthly" 
              y="campaings"
              animate={{duration: 2000, onLoad: { duration: 1000 }}}/>
            </VictoryChart>
        </div>
    );
}

export default PreviousYearCampaign;