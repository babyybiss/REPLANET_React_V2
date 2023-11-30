import { useEffect, useState } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryBrushContainer, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, VictoryTooltip } from "victory"
import "../../assets/css/chart.css";
import { dateFormatToKorean } from "../../utils/DateFormatToKorean";
import { numberFormatToKorean } from "../../utils/NumberFormatToKorean";

function HistoryChart(chartDataListProps) {

    /* chartData from API */
    const { chartDataList } = chartDataListProps;
    console.log(chartDataList)
        
    /* zoom 초기값 설정을 위한 변수 세팅 */ 
    const today = new Date();
    /*
    const fifteenDaysAgo = new Date();
    const fifteenDaysLater = new Date();
    
    fifteenDaysAgo.setDate(today.getDate() - 15)
    fifteenDaysLater.setDate(today.getDate() + 15);
    */
    const firstByToday = new Date(today.getFullYear(),today.getMonth(), 1, 0, 0, 0, 0);
    const lastByToday = new Date(today.getFullYear(),today.getMonth() + 1, 0, 23, 59, 59, 999);
    
    
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(firstByToday);
    const [lastDayOfMonth, setLastDayOfMonth] = useState(lastByToday);
    const [selectedOption, setSelectedOption] = useState(11);
    
    /* zoom state */ 
    const [zoomDomain, setZoomDomain] = useState({
        x: [firstDayOfMonth, lastDayOfMonth]
    });
    const [brushDomain, setBrushDomain] = useState({
        x: [firstDayOfMonth, lastDayOfMonth]
    })

    console.log(zoomDomain)
    console.log('gk..',selectedOption)
    
    console.log('바뀌었니?',firstDayOfMonth)
    console.log('바뀌었니',lastDayOfMonth)
    
    useEffect(() => {
        const calcDays = (selectedOption) => {
            const today = new Date();
            today.setMonth(selectedOption - 1);

            console.log(today.setMonth(selectedOption - 1))
            const calcFirstDay = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
            const calcLastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)

            return { calcFirstDay, calcLastDay };
        };

        const { calcFirstDay, calcLastDay } = calcDays(selectedOption);
        setFirstDayOfMonth(calcFirstDay);
        setLastDayOfMonth(calcLastDay);
        setZoomDomain({
            x: [calcFirstDay, calcLastDay]
        })
        setBrushDomain({
            x: [calcFirstDay, calcLastDay]
        })
        console.log('옵션바뀔경우 비꿔여ㅓ야함',firstDayOfMonth)
        console.log('옵션바뀔경우 비꿔여ㅓ야함',lastDayOfMonth)

    },[selectedOption]);
    

    const zoomDomainHandler = (domain) => {
        setZoomDomain(domain);
    }

    const brushDomainHandler = (domain) => {
        setZoomDomain(domain);

    }
    
    const optionChangeHandler = (e) => {
        const changedOption = parseInt(e.target.value, 10);
        setSelectedOption(changedOption);
    }
    

    /* chart figure */ 
    const width = 1500;
    const height = 700;
    const brushChartHeight = 200;
    const brushTickValues = [firstDayOfMonth, lastDayOfMonth];

    /* chart padding */ 
    const zoomChartPadding = { left: 100, right: 50, top: 50, bottom: 50 }
    const brushChartPadding = { left: 100, right: 50, top: 0, bottom: 30 }

    /* x축, y축 기준이 될 데이터 설정 */
    const stringX = 'donationDate';
    const stringY = 'donationAmount';
    
    /* style setting */
    const baseFillStyle = { fill: "#10573C" }
    const baseStrokeStyle = { stroke: "#10573C" }

    const toolTipStyle = {
        fontSize: 20, 
        ...baseFillStyle
    }

    const lineAndScatterStyle = {
        data: { ...baseStrokeStyle }
    }

    const axisStyle = {
        axis: { ...baseStrokeStyle , strokeWidth: 2 },
        axisLabel: { fontSize: 20, padding: 36, ...baseFillStyle },
        tickLabels: { fontSize: 20, padding: 8, ...baseFillStyle }
    }
    
    /* render */ 
    return (
        <div className='chartbox'>
            <h4>일별 모금액 추이</h4>
            <select 
                value={selectedOption}
                onChange={optionChangeHandler}
            >
                <option value={11}>선택해주세요</option>
                <option value={1}>1월</option>
                <option value={2}>2월</option>
                <option value={3}>3월</option>
                <option value={4}>4월</option>
                <option value={5}>5월</option>
                <option value={6}>6월</option>
                <option value={7}>7월</option>
                <option value={8}>8월</option>
                <option value={9}>9월</option>
                <option value={10}>10월</option>
                <option value={11}>11월</option>
                <option value={12}>12월</option>
            </select>
            <VictoryChart
                width={width} height={height}
                padding={zoomChartPadding}
                domainPadding={{x: 50, y: 50}} 
                // scale={{ x: "time" }}
                containerComponent={
                    <VictoryZoomContainer
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        // allowZoom={false}
                        onZoomDomainChange={zoomDomainHandler}
                    />
                }
            >
                <VictoryAxis
                    style={axisStyle}
                    tickFormat={(x) => dateFormatToKorean(x, false)}
                />
                <VictoryAxis 
                    dependentAxis
                    tickFormat={(x) => `${numberFormatToKorean(x, false)}원`}
                    style={axisStyle}
                />
                <VictoryGroup
                    color="#10573C"
                    labels={({ datum }) => `${dateFormatToKorean(datum._x)}, ${numberFormatToKorean(datum._y)}원`}
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
                        style={lineAndScatterStyle}
                        x={stringX}
                        y={stringY}
                    />
                    <VictoryScatter
                        style={lineAndScatterStyle}
                        x={stringX}
                        y={stringY}
                        size={5}
                    />
                </VictoryGroup>
            </VictoryChart>
            <VictoryChart
                padding={brushChartPadding}
                domainPadding={{x: 50, y: 10}}
                width={width} height={brushChartHeight}
                // scale={{ x: "time" }}
                containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={brushDomain}
                        onBrushDomainChange={brushDomainHandler}   
                    />
                }
            >
                <VictoryAxis
                    tickValues={brushTickValues}
                    tickFormat={(x) => `${dateFormatToKorean(x, false)}`}
                    style={axisStyle}
                />
                <VictoryLine
                    style={lineAndScatterStyle}
                    data={chartDataList}
                    x={stringX}
                    y={stringY}
                />
                
            </VictoryChart>
        </div>
    );
}

export default HistoryChart;