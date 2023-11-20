import {VictoryChart, VictoryLabel, VictoryLine, VictoryAxis, VictoryBrushLine} from 'victory';
import "../../assets/css/chart.css";
import _ from 'lodash';
import { useState } from 'react';


const categoryData = [
  {
      campaignCategory: "재난", campaings: 15, goalBudget: 600000, currentBudget: 400000, expectBudget: 200000
  },
  {
      campaignCategory: "지구촌", campaings: 35, goalBudget: 500000, currentBudget: 350000, expectBudget: 150000
  },
  {
      campaignCategory: "아동", campaings: 20, goalBudget: 800000, currentBudget: 800000, expectBudget: 0
  },
  {
      campaignCategory: "노인", campaings: 10, goalBudget: 300000, currentBudget: 200000, expectBudget: 100000
  },
  {
      campaignCategory: "소외", campaings: 9, goalBudget: 220000,   currentBudget: 200000, expectBudget: 20000
  }
];


const attributes = ["campaings", "goalBudget", "currentBudget", "expectBudget"];

/* state initial callback */ 
const getMaximum = () => {
  return attributes.map((attribute) => {
    return categoryData.reduce((memo, datum) => {
      return datum[attribute] > memo ? datum[attribute] : memo;
    }, -Infinity);
  });
}

const normalizeData = (maximumValues) => {
  return categoryData.map((datum) => ({
    name: datum.campaignCategory,
    data: attributes.map((attribute, i) => (
      {x: attribute, y: datum[attribute] / maximumValues[i]}
    ))
  }));
}

function TestChart(chartDataList) {
  console.log('TestChart Data?', chartDataList)
  
  const [maximumValues, setMaximumValues] = useState(() =>
  getMaximum());
  const [datasets, setDatasets] = useState(() => normalizeData(maximumValues));
  const [filters, setFilters] = useState({});
  const [activeDatasets, setActiveDatasets] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  /* chart figure */ 
  const width = 1500;
  const height = 700;
  const padding = { top: 100, left: 50, right: 50, bottom: 50 };

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
    const step = (width - padding.left - padding.right) / (attributes.length - 1);
    return step * index + padding.left;
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
        padding={padding}
        width={width} height={height}
      >
        <VictoryAxis
          style={axisStyle}
          tickValues={[1, 2, 3, 4]}
          tickFormat={["캠페인 수 (건)","목표모금액(단위 : 원)","현재모금액(단위 : 원)","테스트1"]}
          // 기준 축 라벨 상하 위치
          tickLabelComponent={<VictoryLabel y={padding.top - 40}/>}
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
        {attributes.map((attribute, index) => (
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