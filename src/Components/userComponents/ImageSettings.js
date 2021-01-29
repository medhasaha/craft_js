import { useNode } from '@craftjs/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
import { Typography, Grid, FormControl, FormLabel, Input, InputBase, InputLabel,
	       Select, MenuItem, Divider, ButtonGroup, Button as MaterialButton} from '@material-ui/core';

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
	inputBase : {
		border: "none",
		margin: "0px",
		width: "100px",
		height: "40px",
	}
})

const ImageSettings = (props) => {
	const { classes, theme } = props
  const {src, height, width, selectedColumn, columnName, actions: { setProp },} = useNode((node) => ({
    src : node.data.props.src,
    height : node.data.props.height,
    width : node.data.props.width,
    selectedColumn : node.data.props.selectedColumn,
    columnName : node.data.props.columnName
  }));
  
	const [name, setName] = React.useState(selectedColumn);
	const [imgHeight, setImgHeight] = React.useState(height)
  const [imgWidth, setImgWidth] = React.useState(width)
  
  return (
		<div>
			<Grid container>
				
			  <Grid item xs = {12} style = {{padding : "16px"}}>
          <FormControl style = {{width : "100%"}}>
						<FormLabel component="legend" style = {{marginBottom : "20px"}}>Choose Image Source</FormLabel>
						<Select value = {name}
						        variant = "outlined"
										onChange={(event) => {
											setName(event.target.value);
											setProp((props) => (props.selectedColumn = event.target.value), 1000);
										}}
									displayEmpty>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{columnName.map(item => (
										<MenuItem value={item}>{item}</MenuItem>
									))}
						</Select>
				  </FormControl>
				</Grid>

				<Grid item xs = {12}>
					<Divider style = {{height : "1px", width : "100%"}}/>
				</Grid>

				<Grid item xs = {12} style = {{padding : "16px"}}>
					<FormControl fullWidth={true} margin="normal" component="fieldset">
						<FormLabel component="legend" style = {{marginBottom : "20px"}}>Height</FormLabel>
						{/*<Slider
							value={height || 150}
							step={10}
							min={1}
							max={720}
							onChange={(_, value) => {
								setProp((props) => (props.height = value), 1000);
							}}
						/>*/}
						<div className = {classes.outerDiv}>
							<div className = {classes.valueButton} id="decrease" 
									 style = {{  marginRight: "-4px", borderRight : "1px solid rgba(255, 255, 255, 0.23)"}}
									 onClick={() => {
										 let newHeight = imgHeight - 1 < 10 ? 10 : imgHeight - 1;
										 setImgHeight(newHeight);
										 setProp((props) => (props.height = newHeight), 1000);
							 		 }}>-</div>
							<InputBase type="number"
												 value = {imgHeight || 150} 
												 classes = {{input : classes.inputBaseInput}}
												 className = {classes.inputBase}
												 onChange = {(event) => {
													 setImgHeight(event.target.value);
													 setProp((props) => (props.height = event.target.value), 1000);
												 }} />
							<div className={classes.valueButton} id="increase" 
									 style = {{  marginLeft: "-4px", borderLeft : "1px solid rgba(255, 255, 255, 0.23)"}}
									 onClick={() => {
										 let newHeight = imgHeight + 1 > 720 ? 720 : imgHeight + 1;
										 setImgHeight(newHeight);
										 setProp((props) => (props.height = newHeight), 1000);
									 }}>+</div>
						</div>
					</FormControl>
				</Grid>

				<Grid item xs = {12}>
					<Divider style = {{height : "1px", width : "100%"}}/>
				</Grid>

				<Grid item xs = {12} style = {{padding : "16px"}}>
				  <FormControl fullWidth={true} margin="normal" component="fieldset">
						<FormLabel component="legend" style = {{marginBottom : "20px"}}>Width</FormLabel>
						{/*<Slider
							value={width || 14}
							step={10}
							min={1}
							max={720}
							onChange={(_, value) => {
								setProp((props) => (props.width = value), 1000);
							}}
						/>*/}
						<div className = {classes.outerDiv}>
							<div className = {classes.valueButton} id="decrease" 
									 style = {{  marginRight: "-4px", borderRight : "1px solid rgba(255, 255, 255, 0.23)"}}
									 onClick={() => {
										 let newWidth = imgWidth - 1 < 10 ? 10 : imgWidth - 1;
										 setImgWidth(newWidth);
										 setProp((props) => (props.width = newWidth), 1000);
							 		 }}>-</div>
							<InputBase type="number"
												 value = {imgWidth || 150} 
												 classes = {{input : classes.inputBaseInput}}
												 className = {classes.inputBase}
												 onChange = {(event) => {
													setImgWidth(event.target.value);
													 setProp((props) => (props.width = event.target.value), 1000);
												 }} />
							<div className={classes.valueButton} id="increase" 
									 style = {{  marginLeft: "-4px", borderLeft : "1px solid rgba(255, 255, 255, 0.23)"}}
									 onClick={() => {
										 let newWidth = imgWidth + 1 > 720 ? 720 : imgWidth + 1;
										 setImgWidth(newWidth);
										 setProp((props) => (props.width = newWidth), 1000);
									 }}>+</div>
						</div>
				  </FormControl>
				</Grid>

				<Grid item xs = {12}>
					<Divider style = {{height : "1px", width : "100%"}}/>
				</Grid>
			
			</Grid>
    </div>
  );
};
	
export default withStyles( style, { withTheme: true } )( ImageSettings )