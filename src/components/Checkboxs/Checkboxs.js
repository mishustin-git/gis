import React from 'react';
import {WebMapView} from '../../components/WebMapView/WebMapView.js'

export class AddNewItem extends React.Component{
  render(){
    return(
      <div>
        <button onClick={this.props.onClick}>+</button>
      </div>
    )
  }
}

export class ListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:this.props.name,
      serviceCheck:this.props.checked
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({serviceCheck: e.target.checked});
  }
  // componentDidMount() {
  //   document.addEventListener('change', this.handleChange);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener('change', this.handleChange);
  // }
  render(){
    return(
      <tr>
        <td>
          <input type="checkbox" name={this.state.name} checked={this.state.serviceCheck} onChange={this.handleChange} onClick={this.props.onClick}/>
        </td>
        <td>{this.state.name}</td>
      </tr>
    )
  }
}

export class Table extends React.Component{
  constructor(props){
    super(props);
    this.state = {lists:this.props.layers,name:"",url:"",basemap:this.props.basemap,};
    this.addRow = this.addRow.bind(this);
    this.changeListItem = this.changeListItem.bind(this);
    this.saveName = this.saveName.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
  }
  addRow(){
    var newItem = {
      "name":this.state.name,
      "url":this.state.url,
      "checked":false,
    }
    //
    var AllItem = this.state.lists.concat([newItem]);
    this.setState({lists: AllItem});
  }
  changeListItem(e){
  	const kol = this.state.lists.length;
  	const currentList = this.state.lists;
  	const newList = currentList;
  	for(var i = 0; i < kol;i++)
  	{
  		if (e.target.name == this.state.lists[i].name)
  		{
  			newList[i].checked = e.target.checked;
  			this.setState({
  				lists:newList
  			});
  		}
  	}
  }
  saveName(e){
    this.setState({name:e.target.value});
  }
  saveUrl(e){
    this.setState({url:e.target.value});
  }
  componentDidUpdate(){
  	if (this.props.basemap!=this.state.basemap)
  	{
  		this.setState({
  			basemap:this.props.basemap,
  		});

  	}
  	// const kol = this.state.lists.length;
  	// for(var i = 0; i < kol;i++)
  	// {
  	// 	console.log(this.state.lists[i].checked);
  	// }
  	
  	// console.log(this.state.basemap);
  }
  render(){
    return(
    <div>
    	<div>
	        <table>
	          {this.state.lists.map((layer) =>
	            <ListItem name={layer.name} checked={layer.checked} onClick={this.changeListItem}/>
	          )}
	        </table>
{/*          <input type="text" placeholder="name" onChange={this.saveName}/>
          <input type="text" placeholder="url"  onChange={this.saveUrl}/>
          <AddNewItem onClick={this.addRow}/>*/}
	    </div>
	    <div>
	    	<WebMapView basemap={this.state.basemap} layers={this.state.lists}/>
	    </div>
    </div>
    )
  }
}