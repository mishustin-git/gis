import React from 'react';
import { loadModules } from 'esri-loader';
import './WebMapView.css'
//import { SelectBox } from '../../components/SelectBaseMap/SelectBaseMap.js';

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      basemap : this.props.basemap,
      layers: this.props.layers,
    }
  }
//TO DO организовать прием переменной
  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView','esri/layers/FeatureLayer'], { css: true })
    .then(([ArcGISMap, MapView,FeatureLayer]) => {
      const map = new ArcGISMap({
        //TO DO
        //передавать параметр
        //basemap: 'topo-vector'
        //Теперь basemap принимает значение tupemap
        basemap: this.state.basemap,
        //basemap: SelectBox.getMapType();
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8
      });
      const allLayers = this.state.layers;
      for(var i=0;i<allLayers.length;i++)
      {
        if (allLayers[i].checked)
          {
            var example = new FeatureLayer({
              url:allLayers[i].url,
            })
            map.add(example);
            // const example = new FeatureLayer({
            //   url:h.url,
            // })
            // map.add(example)
          }
      }
      //console.log(this.state.layers[0].checked);
      // const trailheadsLayer = new FeatureLayer({
      //   url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
      // });
      // map.add(trailheadsLayer);

    });
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }
    componentDidUpdate(){
      if (this.state.basemap!==this.props.basemap)
      {
        this.setState({basemap:this.props.basemap})
        // this.componentWillUnmount();
        // this.componentDidMount();
      }
      if (this.props.layers.length!=this.state.layers.length)
      {
        this.setState({layers:this.props.layers})
      }
      this.componentWillUnmount();
      this.componentDidMount();
      console.log(this.view.map);
    }

  render() {
    //temp = 'streets';
    //this.state = temp;
    return (
      <div>
        <div className="webmap" ref={this.mapRef}></div>
      </div>
    );
  }
}