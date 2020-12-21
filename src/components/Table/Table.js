import React from 'react';
import {ModalButton} from '../../components/ModalWindow/ModalWindow.js'

export class DynamicColumnTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabletype:this.props.tabletype,
      newData:this.props.newData,
      delData:"",
      GeoJSON:{
        type: "FeatureCollection",
        features:[],
      },
    };
    this.createJSON = this.createJSON.bind(this);
    if (this.state.tabletype=="point"){
      this.state.columns = [
        {value:"x",id:1},
        {value:"y",id:2}]
    }
    else if(this.state.tabletype == "polyline")
    {
      this.state.columns = [
        {value:"paths",id:1}]
    }
    else
    {
      this.state.columns = [
        {value:"rings",id:1}]
    }
    this.state.rows = [];
    this.addColumn = this.addColumn.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateRows = this.updateRows.bind(this);
  }
  generateID() {
    return (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
  }
  componentDidUpdate() {
     if (this.state.tabletype!==this.props.tabletype)
      {
        this.setState({tabletype:this.props.tabletype})
        this.setState({rows:[]});
        if (this.props.tabletype=="point"){
          this.setState({columns:[{value:"x",id:1},{value:"y",id:2}]});
        }
        else if(this.props.tabletype == "polyline")
        {
          this.setState({columns:[{value:"paths",id:1}]});
        }
        else
        {
          this.setState({columns:[{value:"rings",id:1}]});
        }
        // this.componentWillUnmount();
        // this.componentDidMount();
      }
      if (this.state.delData!==this.props.delData)
      {
        this.setState({delData:this.props.delData});
        if (this.state.tabletype == "point")
        {
          var prevRows = this.state.rows.slice();
          var count = this.props.delData.length;
          for (var i = 0;i<count;i++)
          {
            var newRows = new Array();
            for(var j=0;j<prevRows.length;j++)
            {
              if (prevRows[j][0].value==this.props.delData[i].x && prevRows[j][1].value!==this.props.delData[i].x)
              {}
              else
              {
                newRows.push(prevRows[j]);
              }
            }
            prevRows = newRows;
          };
          this.setState({rows:prevRows});
        }
        else
          if (this.state.tabletype == "polyline")
          {
            var count = this.props.delData[0].paths[0].length;
            var value = "";
            for (var i = 0;i<count;i++)
            {
              value = value + "[" + this.props.delData[0].paths[0][i][0] + "," + this.props.delData[0].paths[0][i][1]+"],";
            }
            var prevRows = this.state.rows.slice();
            count = prevRows.length;
            var newRows = new Array();
            for (var j = 0;j < count ; j++)
            {
              if (prevRows[j][0].value == value)
              {

              }
              else
              {
                newRows.push(prevRows[j]);
              }
            }
            this.setState({rows:newRows});
          }
          else
          {
            var count = this.props.delData[0].rings[0].length;
            var value = "";
            for (var i = 0;i<count;i++)
            {
              value = value + "[" + this.props.delData[0].rings[0][i][0] + "," + this.props.delData[0].rings[0][i][1]+"],";
            }
            var prevRows = this.state.rows.slice();
            count = prevRows.length;
            var newRows = new Array();
            for (var j = 0;j < count ; j++)
            {
              if (prevRows[j][0].value == value)
              {

              }
              else
              {
                newRows.push(prevRows[j]);
              }
            }
            this.setState({rows:newRows});
          }
          this.createJSON();
        }
      if (this.state.newData!==this.props.newData)
      {
        this.setState({newData:this.props.newData});
        if (this.state.tabletype == "point")
        {
          var allRows = this.state.rows.slice();
          var newRow = new Array();
          var id = this.generateID(); 
          var RowItem = {
            id:id,
            value:this.props.newData.x,
          }
          newRow.push(RowItem);
          var id = this.generateID(); 
          RowItem = {
            id:id,
            value:this.props.newData.y,
          };
          newRow.push(RowItem);
          var count = this.state.columns.length;
          for (var i = 2;i<count;i++)
          {
            var id = this.generateID(); 
            RowItem = {
              id:id,
              value:"null",
            };
            newRow.push(RowItem);
          };
          allRows.push(newRow);
          this.setState({rows:allRows});
        }
        else if (this.state.tabletype == "polyline")
        {
          var allRows = this.state.rows.slice();
          var newRow = new Array();
          var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
          var count = this.props.newData.paths[0].length;
          //console.log(count);
          var value = "";
          for (var i = 0;i<count;i++)
          {
            value = value + "[" + this.props.newData.paths[0][i][0] + "," + this.props.newData.paths[0][i][1]+"],";
          }
          var RowItem = {
            id:id,
            value:value,
          }
          newRow.push(RowItem);
          count = this.state.columns.length;
          for (var i = 1;i<count;i++)
          {
            id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36); 
            RowItem = {
              id:id,
              value:"null",
            };
            newRow.push(RowItem);
          };
          allRows.push(newRow);
          this.setState({rows:allRows});
        }
        else
        {
          var allRows = this.state.rows.slice();
          var newRow = new Array();
          var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
          var count = this.props.newData.rings[0].length;
          //console.log(count);
          var value = "";
          for (var i = 0;i<count;i++)
          {
            value = value + "[" + this.props.newData.rings[0][i][0] + "," + this.props.newData.rings[0][i][1]+"],";
          }
          var RowItem = {
            id:id,
            value:value,
          }
          newRow.push(RowItem);
          count = this.state.columns.length;
          for (var i = 1;i<count;i++)
          {
            id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36); 
            RowItem = {
              id:id,
              value:"null",
            };
            newRow.push(RowItem);
          };
          allRows.push(newRow);
          this.setState({rows:allRows});
        }
        //console.log(this.state.newData);
        this.createJSON();
      }
      if (this.state.rows.length != this.state.GeoJSON.features.length)
      {
        this.createJSON();
      }
  }
  updateColumns(e){
    var allColumns = this.state.columns.slice();
    var count = allColumns.length;
    for (var i =2;i <count;i++)
      {
        if (e.target.id == allColumns[i].id)
          {
            allColumns[i].value = e.target.value;
          } 
      }
    this.setState({columns:allColumns});
  }
  updateRows(e){
    var allRows = this.state.rows.slice();
    var count_i = allRows.length;

    for (var i =0;i <count_i;i++)
    {
      var count_j = allRows[i].length;
      for(var j = 2; j< count_j;j++)
        {
              //console.log(allRows[i][j]);
           if (e.target.id == allRows[i][j].id)
           {
             allRows[i][j].value = e.target.value;
           }
        }
    }
   this.setState({rows:allRows});
  }
  addColumn(e){
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);    
    var item = {
      value:"null",
      id:id,
    }
    var temp = this.state.columns.concat([item]);
    this.setState({columns:temp});
    var allRows = this.state.rows.slice();
    for (var i = 0; i<this.state.rows.length;i++)
      {
        var new_id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var item_new = {
          value:"null",
          id:id,
        }
        var mass = new Array;
        for (var j = 0; j< this.state.rows[i].length;j++)
      {
        mass.push(this.state.rows[i][j]);
        //console.log(this.state.rows[i][j]);
      }
        mass.push(item_new);
        allRows[i]=mass;
      }
    this.setState({rows:allRows});
  }
  createJSON()
  {
    var count = this.state.rows.length;
    var all_features = new Array();
    for(var i = 0;i <count;i++)
    {
      
      if (this.state.tabletype == "point"){
        var coordinates = new Array();
          coordinates.push(this.state.rows[i][0].value);
          coordinates.push(this.state.rows[i][1].value);
        var geometry = {
          type:"Point",
          coordinates:coordinates
        }
        var properties = new Object();
        var count_in = this.state.columns.length;
        for (var j = 2; j< count_in;j ++)
        {
          properties[this.state.columns[j].value] = this.state.rows[i][j].value;
        }
        var features = {
          type:"Feature",
          properties:properties,
          geometry:geometry,
        }
        all_features.push(features)
    }
    else if (this.state.tabletype == "polyline"){
      var coordinates = new Array();
      var example = this.state.rows[i][0].value.match(/\-?\d+\.\d+/g);
      for (var d = 0;d <example.length/2;d++)
      {
        var temp = new Array();
        temp.push(example[d*2]*1);
        temp.push(example[d*2+1]*1);
        coordinates.push(temp);
      }
      var geometry = {
        type:"LineString",
        coordinates:coordinates
      }
      var properties = new Object();
      var count_in = this.state.columns.length;
      for (var j = 1; j< count_in;j ++)
        {
          properties[this.state.columns[j].value] = this.state.rows[i][j].value;
        }
         var features = {
           type:"Feature",
           properties:properties,
           geometry:geometry,
         }
         all_features.push(features)
    }
    else
    {
       var coordinates = new Array();
       var example = this.state.rows[i][0].value.match(/\-?\d+\.\d+/g);
       for (var d = 0;d <example.length/2;d++)
       {
         var temp = new Array();
         temp.push(example[d*2]*1);
         temp.push(example[d*2+1]*1);
         coordinates.push(temp);
       }
       var geometry = {
         type:"Polygon",
         coordinates:coordinates
       }
       var properties = new Object();
       var count_in = this.state.columns.length;
       for (var j = 1; j< count_in;j ++)
         {
           properties[this.state.columns[j].value] = this.state.rows[i][j].value;
         }
          var features = {
            type:"Feature",
            properties:properties,
            geometry:geometry,
          }
          all_features.push(features)
    }
    // //else if ()
  }
  var newGeoJSON = {
    type:this.state.GeoJSON.type,
    features:all_features,
  }
  this.setState({GeoJSON:newGeoJSON});
}
  render() {
    return (
      <div className="">
        <table>
          <tr>
            {this.state.columns.map((column)=>
                                    <EditableCell value={column.value} id={column.id} onUpdate={this.updateColumns}/>
                                   )}
            <td>
              <button onClick={this.addColumn}>+</button></td>
          </tr>
            {this.state.rows.map((row)=>
                          <tr>{row.map((element)=>
                                      <td>
                                         <EditableCell value={element.value} id={element.id} onUpdate={this.updateRows}/>
                                       </td>
                                      )}</tr>
                          )}
        </table>
        <div>
          <ModalButton GeoJSON={this.state.GeoJSON}/>
        </div>
      </div>
    )
  }
}
class EditableCell extends React.Component{
  render() {
    return (
      <td>
        <input type="text" value={this.props.value} id={this.props.id} onChange={this.props.onUpdate}/>
      </td>
    );

  }
}