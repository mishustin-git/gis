import React from 'react';
import { WebMapView } from '../../components/WebMapView/WebMapView';
import {Table} from '../../components/Checkboxs/Checkboxs.js';

export class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { name: 'Карта 1', value: 'streets',};
    this.options =  [
      {
        name: 'Карта 1',
        value: 'streets',
      },
      {
        name: 'Карта 2',
        value: 'topo-vector',
      },
    ]
  }
  //var p=React.createElement(<WebMapView state={this.state.value}/>)
  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  render() {
    const examples = [
  {
    "name":"trailheadsLayer",
    "url":"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
    "checked":true,
  },
  {
    "name":"trailsLayer",
    "url":"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    "checked":false,
  },
  {
    "name":"parksLayer",
    "url":"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
    "checked":false,
  },
];
    return (
      <div className="">
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="">
          {this.options.map((option) => 
            <option value={option.value} key={option.value}>
                         {option.name}
            </option>)
          }
        </select>
        <Table layers={examples} basemap={this.state.value}/>
        {/*<WebMapView basemap={this.state.value}/>*/}

      </div>
    )
  }
}
