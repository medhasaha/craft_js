import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Typography, Paper, Grid, Button as MaterialButton} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';


import {Editor, Frame, Element} from "@craftjs/core";
import Toolbox from '../Components/editorComponents/Toolbox';
import SettingsPanel from '../Components/editorComponents/SettingsPanel';
import { Topbar } from '../Components/editorComponents/Topbar';
import { Preview } from './Preview.js';
import {RenderNode} from '../Components/editorComponents/RenderNode'

import { Container } from '../Components/userComponents/Container';
import { Button } from '../Components/userComponents/Button';
import { Image } from '../Components/userComponents/Image';
import { Card, CardBottom, CardTop  } from '../Components/userComponents/Card';
import { Text } from '../Components/userComponents/Text';
import {TwoColGrid} from '../Components/userComponents/TwoColGrid'
import {TwoRowGrid} from '../Components/userComponents/TwoRowGrid'
import {Blocks} from '../Components/userComponents/Blocks'


const styles = (theme) => ({
	outerPaper:{
    maxWidth:'720px',
		width : "100%",
		padding : "10px",
		backgroundColor : "#303030",
    [theme.breakpoints.up('md')]: {
      margin: "5px 60px 0px 100px"
      }
	},
	drawer : {
		top: "auto",
    bottom: 0,
    position: "sticky",
    alignSelf: "flex-end",
	},
	drawerPaper: {
		maxWidth : "320px",
		overflowX : "hidden",
		margin : "4px 150px 0px 0px",
  },
})

class MainComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fileColumnNames : ["country", "flag_img", "flag_official_name", "flag_unofficial_name"],
			final : null,
			previewState : null,
			showPreview : false,
			isSelected : false,
			resultObject : {
        country: "Germany",
        flag_img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/100px-Flag_of_Germany.svg.png",
        flag_official_name: "Bundesflagge",
        flag_unofficial_name: "Federal Flag",
			},
			livePreviewState : null,
			livePreviewFlag : false,
		}
	}

	getFinalObject = (input) => {
		// console.log(input);
		this.setState({
			final : input
		}, () => {
			this.props.history.push({
				pathname: `${this.props.baseUrl}/output`,
				state : { data: { 
						jsonNodes : this.state.final,
					}
				}
			})
		}
		)
	}

	showPreviewMethod = (input) => {
		console.log("input",input)
		this.setState({
			showPreview : false
		}, () => {
			this.setState({
				previewState : input,
				showPreview : true
			})
		})
	}

	isSelectedMethod = (value) => {
		this.setState({
			isSelected : value
		})
	}

	replaceColumn = (text) => {
		const { classes, theme } = this.props;

    let newText = text.split(" ").map((item,index) => {
      if(item.substring(0,1) === "@"){
        return this.state.resultObject[item.substring(1,item.length)]
      }else{
        return item
      }
    })

    return newText.join(" ")
  }

  formatJsonNodes = (jsonNodes) => {
		let newJsonNodes = {...jsonNodes}
    Object.keys(newJsonNodes).map(key => {
      // console.log(newJsonNodes[key])
      let item = newJsonNodes[key]
      if(item.type && item.type.resolvedName === "Text"){
        item.props.text = this.replaceColumn(item.props.text)
      }
      if(item.type && item.type.resolvedName === "Image"){
        item.props.src = this.state.resultObject[item.props.selectedColumn]
      }
		})
	  // console.log(newJsonNodes)
    return newJsonNodes
  }

	render(){
		const { classes, theme } = this.props;
		return (
			<Paper className = {classes.outerPaper}>
				<Editor resolver={{ Card, Button, Text, Container, TwoColGrid, Image, TwoRowGrid, Blocks }} 
								onRender={(e) => RenderNode(e)} 
								onNodesChange={query => {
									// console.log("onNodesChange MainComponent", query.getSerializedNodes());
									this.setState({
										livePreviewFlag : false
									}, () => {
										this.setState({
											livePreviewFlag : true,
											livePreviewState : query.getSerializedNodes()
										})
									})
								}}>
					<Topbar getFinalObject = {this.getFinalObject} showPreview = {this.showPreviewMethod}/>
					<Grid container spacing={5} style={{ paddingTop: '10px' }}>
						<Grid item xs = {12}>
							<Paper >
								{<Toolbox selectedColumn = {this.state.fileColumnNames[0]} columnName = {this.state.fileColumnNames}/>}
							</Paper>
						</Grid>
						<Grid item xs = {12}>
							<Frame>
								<Element canvas is={Card}>
									{/*<Text fontSize={20} text="Hi world!" />
									<Image selectedColumn = {this.state.fileColumnNames[0]} columnName = {this.state.fileColumnNames}/>
									<Element canvas is={Container} padding={5} background="#999999">
										<Text size="small" text="It's me again!" />
									</Element>*/}
									{<TwoColGrid columnName = {this.state.fileColumnNames}/>}
								</Element>
							</Frame>
						</Grid>

						<Drawer anchor="right" 
										// open={this.state.isSelected} 
										open = {true}
										style = {{display : this.state.isSelected ? "block": "none"}}
										variant = "persistent" 
										className = {classes.drawer}
										classes={{ paper: classes.drawerPaper }}>
						  {<SettingsPanel returnSelectedValue = {this.isSelectedMethod}/>}
						</Drawer>

						<Grid item xs = {12}>
						  {this.state.showPreview && <Typography variant = "button" style = {{marginLeft : "14px"}}>Preview</Typography>}
							{/*<Editor enabled={false} resolver={{Card, Button, Text, Container, TwoColGrid, Image, TwoRowGrid, Blocks}}>
								{this.state.showPreview && <Frame data={this.formatJsonNodes(this.state.previewState)} />}
								</Editor>*/}
							<Editor enabled={false} 
							        resolver={{Card, Button, Text, Container, TwoColGrid, Image, TwoRowGrid, Blocks}}>
								{this.state.livePreviewFlag && <Frame data={this.formatJsonNodes(this.state.livePreviewState)} />}
							</Editor>
							{/*<Preview/>*/}
						</Grid>

					</Grid>
				</Editor>
			</Paper>
		);
	}
}

export default withStyles(styles)(MainComponent);