import {VictoryChart, VictoryLabel, VictoryVoronoiContainer, VictoryLine, VictoryAxis, VictoryBrushLine} from 'victory';
import "../../assets/css/chart.css";
import _ from 'lodash';
import { useState, useEffect } from 'react';


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
const padding = { top: 100, left: 50, right: 50, bottom: 50 };

function TestChart() {
  
  const [maximumValues, setMaximumValues] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeDatasets, setActiveDatasets] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

 

  const normalizeData = () => {
    console.log("d확인용2")
    //console.log(maximumValues)
    return categoryData.map((datum) => ({
      name: datum.campaignCategory,
      data: attributes.map((attribute, i) => (
        {x: attribute, y: datum[attribute] / maximumValues[i]}
      ))
    }));
  }

  const getActiveDatasets = (filters) => {

    const isActive = (dataset) => {
      return _.keys(filters).reduce((memo, name) => {
        if (!memo || !Array.isArray(filters[name])) {
          return memo;
        }
        const point = _.find(dataset.data, (d) => d.x === name);
        return point &&
          Math.max(...filters[name]) >= point.y && Math.min(...filters[name]) <= point.y;
      }, true);
    };
  
    return datasets.map((dataset) => {
      console.log("d확인용7")
      console.log(dataset)
      return isActive(dataset, filters) ? dataset.name : null;
    }).filter(Boolean);
  }

  const onDomainChange = (domain, props) => {
    console.log("d확인용6")
    console.log(props)
    const filters = addNewFilters(domain, props);
    const isFiltered = !_.isEmpty(_.values(filters).filter(Boolean));
    const activeDatasets = isFiltered ? getActiveDatasets(filters) : datasets;

  }

  const addNewFilters = (domain, props) => {
    console.log("d확인용3")
    const filters2 = filters || {};
    const extent = domain && Math.abs(domain[1] - domain[0]);
    const minVal = 1 / Number.MAX_SAFE_INTEGER;
    filters[props.name] = extent <= minVal ? undefined : domain;
    return filters2;
  }

  useEffect(() => {
    const getMaximum = () => {
      console.log("d확인용1")
      return attributes.map((attribute) => {
        return categoryData.reduce((memo, datum) => {
          return datum[attribute] > memo ? datum[attribute] : memo;
        }, -Infinity);
      });
    }
    setMaximumValues(getMaximum());
    setDatasets(normalizeData);
    setFilters(filters);
    setIsFiltered(isFiltered);
    setActiveDatasets(activeDatasets);

    console.log(maximumValues)
  }, 
  []);
  
  const isActive = (dataset) => {
    return !isFiltered ? true : _.includes(activeDatasets, dataset.campaignCategory);
  }

  const getAxisOffset = (index) => {
    const step = (1000 - padding.left - padding.right) / (attributes.length - 1);
    return step * index;
  }
  
  const containerStyle = {
    width: 1000, 
    height: 1000
  }
  
  /* render */
  return (
    <div className='chartbox'>
      <h4>테스트 용</h4>
      <VictoryChart domain={{ y: [0, 1.1] }}
        padding={padding}
        containerComponent={
          <VictoryVoronoiContainer 
              style={containerStyle}
          />
          }
      >
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 20 }, axis: { stroke: "none" }
          }}
          tickLabelComponent={<VictoryLabel y={padding.top - 40}/>}
        />
        {datasets.map((dataset) => (
          <VictoryLine
            key={dataset.campaignCategory} name={dataset.campaignCategory} data={dataset.categoryData}
            groupComponent={<g/>}
            style={{ data: {
              stroke: "tomato",
              opacity: isActive(dataset) ? 1 : 0.2
            } }}
          />
        ))}
        {attributes.map((attribute, index) => (
          <VictoryAxis dependentAxis
            key={index}
            axisComponent={
              <VictoryBrushLine name={attribute}
                width={20}
                onBrushDomainChange={onDomainChange}
              />
            }
            offsetX={getAxisOffset(index)}
            style={{
              tickLabels: { fontSize: 15, padding: 15, pointerEvents: "none" },
            }}
            tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
            tickFormat={(tick, maximumValues) => Math.round(tick * maximumValues[index])}
          />
        ))}
      </VictoryChart>
    </div>
  );
}
export default TestChart;