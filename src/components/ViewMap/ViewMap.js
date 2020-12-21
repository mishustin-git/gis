import React, { Component } from 'react'
import {ChooseLayers} from '../../components/ChooseLayers/ChooseLayers.js';

export class Inputviewmap extends Component{
  constructor(props) {
      super(props);
      
    }
    render(){
	return (
      <div>
      	<ChooseLayers/>
      </div>
        )
    }
}

export default Inputviewmap;