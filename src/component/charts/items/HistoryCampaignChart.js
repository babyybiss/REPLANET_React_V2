import { useEffect, useState } from "react"
import { VictoryChart, VictoryZoomContainer, VictoryBrushContainer, VictoryLine, VictoryAxis, VictoryScatter, VictoryGroup, VictoryTooltip } from "victory"
import { dateFormatToKorean } from "../../../utils/DateFormatToKorean";
import { numberFormatToKorean } from "../../../utils/NumberFormatToKorean";
import '../../../assets/css/chart.css';

function HistoryCampaignChart(dataProps) {

    const { donationTimeData } = dataProps;
        
    /* zoom 초기값 설정을 위한 변수 세팅 */ 
    const today = new Date();
    const todayGetMonth = today.getMonth() + 1
    const firstByToday = new Date(today.getFullYear(),today.getMonth(), 1, 0, 0, 0, 0);
    const lastByToday = new Date(today.getFullYear(),today.getMonth() + 1, 0, 23, 59, 59, 999);
    
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(firstByToday);
    const [lastDayOfMonth, setLastDayOfMonth] = useState(lastByToday);

    const [selectedOption, setSelectedOption] = useState(todayGetMonth);
    
    /* zoom state */ 
    const [zoomDomain, setZoomDomain] = useState({
        x: [firstDayOfMonth, lastDayOfMonth]
    });
    const [brushDomain, setBrushDomain] = useState({
        x: [firstDayOfMonth, lastDayOfMonth]
    })
    
    useEffect(() => {
        const calcDays = (selectedOption) => {
            const today = new Date();
            today.setMonth(selectedOption - 1);

            // console.log(today.setMonth(selectedOption - 1))
            const calcFirstDay = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
            const calcLastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)

            return { calcFirstDay, calcLastDay };
        };
        /*
        console.log('세팅 전으로 기대하는 줌도메인:', zoomDomain)
        console.log('세팅 전으로 기대하는 브러시도메인:', brushDomain)
        */
        const { calcFirstDay, calcLastDay } = calcDays(selectedOption);
        setFirstDayOfMonth(calcFirstDay);
        setLastDayOfMonth(calcLastDay);
        setZoomDomain({
            x: [calcFirstDay, calcLastDay]
        })
        setBrushDomain({
            x: [calcFirstDay, calcLastDay]
        })
       return () =>{}
    },[selectedOption]);
    

    const zoomDomainHandler = (domain) => {
        //console.log('줌 도메인이 변경되었으니 여기로 오는거 맞지?')
        
        // 그래프 컴포넌트에서 y축이 x축에 의존하게 해놓았기 때문에 y축 범위는 따로 설정할 필요가 없음.
        const { y, ...filterYFromDomain } = domain;
        // console.log(filterYFromDomain)
        setZoomDomain(filterYFromDomain);
        setBrushDomain(filterYFromDomain);
    }

    const brushDomainHandler = (domain) => {
        const { y, ...filterYFromDomain } = domain;
        setZoomDomain(filterYFromDomain);
        setBrushDomain(filterYFromDomain);
    }
    
    const optionChangeHandler = (e) => {
        const changedOption = parseInt(e.target.value, 10);
        setSelectedOption(changedOption);
        console.log('옵션변경시작')
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
        <div className='chart-box'>
            <h4>월별 모금액 추이</h4>
            <select 
                value={selectedOption}
                onChange={optionChangeHandler}
            >
                <option disabled>옵션을 선택해주세요</option>
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
                    data={donationTimeData}
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
                        size={({ active }) => active ? 8 : 3}
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
                        //allowDraw={false}
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
                    data={donationTimeData}
                    x={stringX}
                    y={stringY}
                />
                
            </VictoryChart>
        </div>
    );
}

export default HistoryCampaignChart;