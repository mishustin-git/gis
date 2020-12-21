import React from 'react';
import {WebMapLayer} from '../../components/WebMapLayer/WebMapLayer.js'
export class SelectToolSketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'point'};
    this.options =  [
      {
        name: 'Точка',
        value: "point",
      },
      {
        name: 'Линия',
        value: "polyline",
      },
      {
        name: 'Полигон',
        value: "polygon",
      },
      {
        name: 'Прямоугольник',
        value: "rectangle",
      },
      {
        name: 'Окружность',
        value: "circle",
      },
    ]
  }
  onChange(e) {
    this.setState({
      value: e.target.value
    });
    // alert(e.target.value);
  }
  render() {
    return (
      <div className="form-group">
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
          {this.options.map((option) => 
            <option value={option.value} key={option.value}>
                         {option.name}
            </option>)
          }
        </select>
        <WebMapLayer activetool={this.state.value}/>
      </div>
    )
  }
}