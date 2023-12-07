import {VictoryChart, VictoryLabel, VictoryLine, VictoryAxis, VictoryBrushLine} from 'victory';
import "../../assets/css/chart.css";
import _ from 'lodash';
import { useState } from 'react';

function TestChart(chartDataListProps) {

  const { chartDataList } = chartDataListProps;

  /* 축 5개 추출 */ 
  const excludeKeyName = ['displaySumCurrentBudget', 'campaignCategory']
  const keyArray = chartDataList.reduce((keys, obj) => {
    return keys.concat(Object.keys(obj).filter(key => !excludeKeyName.includes(key)));
  },[]);
  const uniqueKeys = [...new Set(keyArray)];
  // console.log(uniqueKeys)
  const uniqueKeysToKorean = ['캠페인 수(건)', '현재모금액합계(원)ㄴ', '목표모금액합계(원)', '남은모금액합계(원)', '달성률(%)'];

  const tickValuesAttributes = chartDataList.map((_, index) => index + 1);
  /*
  const tickFormatAttributes = chartDataList.map(categoryname => categoryname.campaignCategory)
  */
 
  const getMaximum = () => {
    return uniqueKeys.map(attribute => {
      return chartDataList.reduce((memo, datum) => {
        return datum[attribute] > memo ? datum[attribute] : memo;
      }, -Infinity);
    });
  };

  const normalizeData = (maximumValues) => {
    return chartDataList.map((datum) => ({
      name: datum.campaignCategory,
      data: uniqueKeys.map((attribute, index) => ({
        x: attribute, y: datum[attribute] / maximumValues[index]
      }))
    }))
  }
  
  const [maximumValues, setMaximumValues] = useState(() =>
  getMaximum());
  const [datasets, setDatasets] = useState(() => normalizeData(maximumValues));
  const [filters, setFilters] = useState({});
  const [activeDatasets, setActiveDatasets] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  /* chart figure */ 
  const width = 1500;
  const height = 700;
  /* chart padding */ 
  const chartPadding = { left: 100, right: 50, top: 100, bottom: 50 }

  const getActiveDatasets = (filters) => {
    
    const isActive = (dataset) => {
      // console.log("filters, dataset ok")
      
      return _.keys(filters).reduce((memo, name) => {
        // console.log("memo, name ok")
        if (!memo || !Array.isArray(filters[name])) {
          return memo;
        }
        const point = _.find(dataset.data, (d) => d.x === name);
        return point &&
          Math.max(...filters[name]) >= point.y && Math.min(...filters[name]) <= point.y;
      }, true);
    };
  
    return datasets.map((dataset) => {
      return isActive(dataset, filters) ? dataset.name : null;
    }).filter(Boolean);
  }

  const addNewFilters = (domain, props) => {
    const newFilters = filters || {};
    const extent = domain && Math.abs(domain[1] - domain[0]);
    const minVal = 1 / Number.MAX_SAFE_INTEGER;
    filters[props.name] = extent <= minVal ? undefined : domain;
    return newFilters;
  }

  const onDomainChange = (domain, props) => {
    
    const filters = addNewFilters(domain, props);
    const isFiltered = !_.isEmpty(_.values(filters).filter(Boolean));
    const activeDatasets = isFiltered ? getActiveDatasets(filters) : datasets;
   
    setFilters(filters);
    setIsFiltered(isFiltered);
    setActiveDatasets(activeDatasets);
  }

  const isActive = (dataset) => {
    return !isFiltered ? true : _.includes(activeDatasets, dataset.name);
  }

  const getAxisOffset = (index) => {
    const step = (width - chartPadding.left - chartPadding.right) / (uniqueKeys.length - 1);
    return step * index + chartPadding.left;
  }
  
  /* style setting */ 
  const axisStyle = {
    tickLabels: { fontSize: 20 }, 
    axis: { stroke: "none" }
  }

  /* render */
  return (
    <div className='chartbox'>
      <h4>테스트 용</h4>
      <VictoryChart 
        domain={{ y: [0, 1.1] }}
        padding={chartPadding}
        width={width} height={height}
      >
        <VictoryAxis
          style={axisStyle}
          tickValues={tickValuesAttributes}
          tickFormat={uniqueKeysToKorean}
          // 기준 축 라벨 상하 위치
          tickLabelComponent={<VictoryLabel y={chartPadding.top - 40}/>}
        />
        {datasets.map((dataset) => (
          <VictoryLine
            key={dataset.name} 
            name={dataset.name} 
            data={dataset.data}
            groupComponent={<g/>}
            style={{ data: {
              stroke: "#92D930",
              opacity: isActive(dataset) ? 1 : 0.2
            } }}
          />
        ))}
        {uniqueKeys.map((attribute, index) => (
          <VictoryAxis dependentAxis
            key={index}
            axisComponent={
              <VictoryBrushLine name={attribute}
                width={40}
                onBrushDomainChange={onDomainChange}
              />
            }
            offsetX={getAxisOffset(index)}
            style={{
              tickLabels: { fontSize: 18, padding: 25, pointerEvents: "none" },
              axis: {stroke: "#10573C", strokeWidth: 3}
            }}
            tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
            tickFormat={(tick) => Math.round(tick * maximumValues[index])}
          />
        ))}
      </VictoryChart>
    </div>
  );
}
export default TestChart;