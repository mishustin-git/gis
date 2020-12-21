import React, { Component } from 'react'
import {SelectToolSketch} from '../../components/SelectToolSketch/SelectToolSketch.js'

export class InputmakeLayer extends Component{
  constructor(props) {
      super(props);
    }
    render(){
	return (
      <div>
      	<SelectToolSketch/>
      </div>
        )
    }
}

export default InputmakeLayer;