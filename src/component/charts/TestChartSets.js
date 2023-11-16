import { useEffect, useState } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryBrushContainer, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, VictoryTooltip } from "victory"
import "../../assets/css/chart.css"

function TestChartSets() {
    const [zoomDomain, setZoomDomain] = useState({
        zoomDomain: {
            x: [new Date('2023-01-01'), new Date('2023-12-31')]
        }
    });

    const zoomDomainHandler = (domain) => setZoomDomain(domain);

    const testData = [
        {
            monthly: new Date('2023-09-23'), campaigns: 10, sumCurrentBudget: 25000, sumGoalBudget: 50000, sumExpectBudget: 25000
        },
        {
            monthly: new Date('2023-01-25'), campaigns: 8, sumCurrentBudget: 50000, sumGoalBudget: 100000, sumExpectBudget: 50000
        },
        {
            monthly: new Date('2023-03-04'), campaigns: 2, sumCurrentBudget: 70000, sumGoalBudget: 150000, sumExpectBudget: 80000
        },
        {
            monthly: new Date('2023-01-23'), campaigns: 9, sumCurrentBudget: 20000, sumGoalBudget: 50000, sumExpectBudget: 30000
        },
        {
            monthly: new Date('2023-08-15'), campaigns: 5, sumCurrentBudget: 30000, sumGoalBudget: 80000, sumExpectBudget: 50000
        },
        {
            monthly: new Date('2023-10-16'), campaigns: 3, sumCurrentBudget: 10000, sumGoalBudget: 31233, sumExpectBudget: 21233
        }
    ];

    const chartStyle = {
        data: { stroke:"#10573C" }
    }

    const toolTipStyle = {
        fontSize: 20, 
        fill: "#10573C"
      }

    return (
        <div className='chartbox'>
            <VictoryChart
                width={1200} height={500}
                domainPadding={{x: 50, y: 50}} 
                scale={{ x: "time" }}
                containerComponent={
                    <VictoryZoomContainer
                        // responsive={false}
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        minimumZoom={{x: 1, y: 1}}
                        // allowZoom={false}
                        onZoomDomainChange={zoomDomainHandler}
                    />
                }
            >
                <VictoryGroup
                    color="#10573C"
                    labels={({ datum }) => `${datum.sumCurrentBudget}원`}
                    labelComponent={
                        <VictoryTooltip
                            style={toolTipStyle}
                        />
                    }
                    data={testData}
                    x="monthly" 
                    y="sumCurrentBudget"
                >
                    <VictoryLine
                        style={chartStyle}
                        x="monthly"
                        y="sumCurrentBudget"
                    />
                    <VictoryScatter
                        style={chartStyle}
                        x="monthly"
                        y="sumCurrentBudget"
                        size={5}
                    />
                </VictoryGroup>
            </VictoryChart>
            <VictoryChart
                padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                domainPadding={{x: 0, y: 5}}
                width={800} height={100}
                scale={{ x: "time" }}
                containerComponent={
                    <VictoryBrushContainer
                        // responsive={false}
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={zoomDomainHandler}   
                    />
                }
            >
                <VictoryAxis
                    tickValues={[
                        new Date('2022-01-01'), new Date('2022-05-01'), new Date('2022-09-01'), new Date('2023-01-01'), new Date('2023-05-01'), new Date('2023-09-01'), new Date('2024-01-01')
                    ]}
                    tickFormat={(x) => `${new Date(x).getFullYear()}년${new Date(x).getMonth() + 1}월`}
                />
                <VictoryLine
                    style={chartStyle}
                    data={testData}
                    x="monthly"
                    y="sumCurrentBudget"
                />
                
            </VictoryChart>
        </div>
    );
}

export default TestChartSets;