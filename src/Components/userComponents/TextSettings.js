// components/user/Text.js
import React from "react";
import { useNode } from "@craftjs/core";
import { withStyles } from '@material-ui/core/styles';
import KeywordTextField from '../KeywordTextField.js'

import { Slider } from '@material-ui/core';
import {Grid, FormControl, FormLabel, InputBase, Divider} from '@material-ui/core';
import { Button } from "./Button.js";

const style = theme => ({
	outerDiv: {
		border: "1px solid rgba(255, 255, 255, 0.23)",
		display : "inline-block",
		// width : "120px",
		borderRadius: "4px 4px 4px 4px",
		"&:hover" : {
		  border: "1px solid #ddd",
		}
	},
	valueButton : {
		display: "inline-block",
		margin: "0px",
		width: "40px",
		height: "20px",
		textAlign: "center",
		verticalAlign: "middle",
		padding: "11px 0",
		userSelect: "none",
		cursor : "pointer"
	},
	inputBaseInput : {
		textAlign: "center",
		"&::-webkit-outer-spin-button" : {
			"-webkit-appearance": "none",
			margin: 0,
		},
		"&::-webkit-inner-spin-button" : {
			"-webkit-appearance": "none",
			margin: 0,
		}
	},
	fontSizeInput : {
		border: "none",
		margin: "0px",
		width: "100px",
		height: "40px",
	}
})

const TextSettings = (props) => {
	const { classes, theme } = props

  const {text, fontSize, columnName, actions: { setProp },} = useNode((node) => ({
    text : node.data.props.text,
    fontSize: node.data.props.fontSize,
    columnName : node.data.props.columnName
  }));

  const [name, setName] = React.useState(text);
  const [size, setSize] = React.useState(fontSize)

  return (
    <React.Fragment>
      {/*<FormControl>
        <InputLabel htmlFor="component-simple">Text To Display</InputLabel>
        <Input value={name} 
               onChange={(event) => {
                  setName(event.target.value);
                  setProp((props) => (props.text = event.target.value), 1000);
               }} />
              </FormControl>*/}
      <Grid container>
        <Grid item xs = {12} style = {{padding : "16px"}}>
          <FormControl fullWidth={true} margin="normal" component="fieldset">
            <FormLabel component="legend" style = {{marginBottom : "20px"}}>Add Text</FormLabel>
            <KeywordTextField fileColumns = {columnName}
                              keyword = {name}
                              index = {0}
                              error = {false}
                              errorMessage = {""}
                              errorIndex = {0}
                              showInputProps = {false}
                              tooltipTitle = {"Add Answer Phrase"}
                              setKeyword = {(value) => {
                                setName(value);
                                setProp((props) => (props.text = value), 1000);
                              }}/>
          </FormControl>
        </Grid>
        <Grid item xs = {12}>
          <Divider style = {{height : "1px", width : "100%"}}/>
        </Grid>
        <Grid item xs = {12} style = {{padding : "16px"}}>
          <FormControl fullWidth={true} margin="normal" component="fieldset" style = {{display : "inline-block"}}>
            <FormLabel component="legend" style = {{marginBottom : "20px"}}>Font Size</FormLabel>
            {/*<Slider
              value={fontSize || 14}
              step={7}
              min={1}
              max={20}
              onChange={(_, value) => {
                setProp((props) => (props.fontSize = value), 1000);
							}}/>*/}
						<div className = {classes.outerDiv}>
							<div className={classes.valueButton} id="decrease" 
									style = {{  marginRight: "-4px", borderRight : "1px solid rgba(255, 255, 255, 0.23)"}}
									onClick={() => {
										let newSize = size - 1 < 1 ? 1 : size - 1;
										setSize(newSize);
										setProp((props) => (props.fontSize = newSize), 1000);
									}}>-</div>
							<InputBase type="number"
										value={size || 14} 
										classes = {{input : classes.inputBaseInput}}
										className = {classes.fontSizeInput}
										onChange={(event) => {
											setSize(event.target.value);
											setProp((props) => (props.fontSize = event.target.value), 1000);
										}} />
							<div className={classes.valueButton} id="increase" 
									style = {{  marginLeft: "-4px", borderLeft : "1px solid rgba(255, 255, 255, 0.23)"}}
									onClick={() => {
										let newSize = size + 1 > 50 ? 50 : size + 1;
										setSize(newSize);
										setProp((props) => (props.fontSize = newSize), 1000);
									}}>+</div>
						</div>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs = {12}>
        <Divider style = {{height : "1px", width : "100%"}}/>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles( style, { withTheme: true } )( TextSettings )