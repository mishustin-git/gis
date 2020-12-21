import React from 'react';
import { loadModules } from 'esri-loader';
import './WebMapLayer.css'
import {DynamicColumnTable} from '../../components/Table/Table.js'

export class WebMapLayer extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      coordinats:[],
      activetool:this.props.activetool,
      newData:"",
      delData:"",
      GEOJSON:"",
    }
    this.coordinats = new Array();
  }

  componentDidMount() {
    loadModules(['esri/Map', 'esri/views/MapView','esri/layers/GraphicsLayer','esri/widgets/Sketch','esri/geometry/support/webMercatorUtils'], { css: true })
    .then(([ArcGISMap, MapView,GraphicsLayer,Sketch,webMercatorUtils]) => {
      const graphicsLayer = new GraphicsLayer();
      const map = new ArcGISMap({
        basemap: "topo-vector",
        layers: [graphicsLayer]
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8
      });
this.sketch = new Sketch({
        view: this.view,
        layer: graphicsLayer,
        availableCreateTools:[this.state.activetool]
      });
this.view.ui.add(this.sketch, "top-right");
this.sketch.on("create", function(event) {
        if (event.state === "complete") {
          var tempJSON = JSON.stringify(event.graphic);
          var temp = JSON.parse(tempJSON);
          this.setState({GEOJSON:tempJSON});
          if (this.state.activetool=="point"){
          var temp_coord = webMercatorUtils.xyToLngLat(temp.geometry.x,temp.geometry.y); 
            var result = {
              x:temp_coord[0],
              y:temp_coord[1],
            }
            this.setState({newData:result});
          }
          else if(this.state.activetool == "polyline")
          {
            var new_array = new Array();
            for (var i = 0; i<temp.geometry.paths[0].length;i++)
            {
              var temp_arr = webMercatorUtils.xyToLngLat(temp.geometry.paths[0][i][0],temp.geometry.paths[0][i][1]);
                new_array.push(temp_arr);
            }
            var result = {
              paths: [new_array],
            }
            this.setState({newData:result});
            //console.log(result);
          }
          else
          {
            var new_array = new Array();
            for (var i = 0; i<temp.geometry.rings[0].length;i++)
            {
              var temp_arr = webMercatorUtils.xyToLngLat(temp.geometry.rings[0][i][0],temp.geometry.rings[0][i][1]);
                new_array.push(temp_arr);
            }
            var result = {
              rings: [new_array],
            }
            this.setState({newData:result});
          }
          
        }
      }.bind(this));
      this.sketch.on("delete", function(event){
          var tempJSON = JSON.stringify(event.graphics);
          var temp = JSON.parse(tempJSON);
          this.setState({GEOJSON:tempJSON});
          var result = new Array();
          for (var i =0;i<temp.length;i++)
          {
           if (this.state.activetool=="point"){ 

            var temp_coord = webMercatorUtils.xyToLngLat(temp[i].geometry.x,temp[i].geometry.y); 
            var item = {
              x:temp_coord[0],
              y:temp_coord[1],
            }
             result.push(item);
           }
            else if(this.state.activetool == "polyline")
            {
                          var new_array = new Array();
                        for (var j = 0; j<temp[i].geometry.paths[0].length;j++)
                        {
                          var temp_arr = webMercatorUtils.xyToLngLat(temp[i].geometry.paths[0][j][0],temp[i].geometry.paths[0][j][1]);
                            new_array.push(temp_arr);
                        }
              var item = {
                paths: [new_array],
              }
              result.push(item);
            }
            else
            {

                          var new_array = new Array();
                        for (var j = 0; j<temp[i].geometry.rings[0].length;j++)
                        {
                          var temp_arr = webMercatorUtils.xyToLngLat(temp[i].geometry.rings[0][j][0],temp[i].geometry.rings[0][j][1]);
                            new_array.push(temp_arr);
                        }
              var item = {
                rings: [new_array],
              }
              result.push(item);
            }
          }
          //console.log(result);
          this.setState({delData:result});
      }.bind(this));
    });
  }
  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }
    componentDidUpdate(){
      if (this.state.activetool!==this.props.activetool)
      {
        this.setState({activetool:this.props.activetool})
        this.componentWillUnmount();
        this.componentDidMount();
      }
    }

  render() {
    return (
      <div>
      <div>
        <div className="webmap" ref={this.mapRef}></div>
      </div>
      <div>
      <DynamicColumnTable tabletype={this.state.activetool} newData={this.state.newData} delData={this.state.delData}/>
      </div>
      </div>
    );
  }
}