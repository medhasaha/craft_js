import React from 'react'
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Route } from "react-router-dom";
import MainComponent from './MainComponent.js';
import Output from './Output.js'


export class Base extends Component  {
	
	constructor(props) {
		super(props);
	}

	componentDidMount(){
  }
  
  componentDidUpdate (prevProps, prevState) {
	}

  render(){
  	return (
			<React.Fragment>
				<Route exact path={this.props.match.url + "/testing"} 
							 render={(props)=> <MainComponent {...props} baseUrl={this.props.match.url}/>} />
				<Route exact path={this.props.match.url + "/output"} 
							 render={(props)=> <Output {...props} baseUrl={this.props.match.url}/>} />
			</React.Fragment> 
  	)
  }
}