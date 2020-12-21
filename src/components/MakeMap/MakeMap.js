import React, { Component } from 'react'
//import {SelectToolSketch} from '../../components/SelectToolSketch/SelectToolSketch.js'
import {SelectBox} from '../../components/SelectBaseMap/SelectBaseMap.js';
export class Inputmakemap extends Component{
  constructor(props) {
      super(props);
    }
    render(){
	return (
      <div>
        <SelectBox />
      </div>
        )
    }
}

export default Inputmakemap;
