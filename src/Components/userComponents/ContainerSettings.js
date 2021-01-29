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

const ContainerSettings = (props) => {
	const { classes, theme } = props
  const {padding, actions: { setProp },} = useNode((node) => ({
    padding : node.data.props.padding,
  }));
  
	const [conPadding, setConPadding] = React.useState(padding);
  
  return (
		<div>
			<Grid container>

				<Grid item xs = {12} style = {{padding : "16px"}}>
				  <FormControl fullWidth={true} margin="normal" component="fieldset">
						<FormLabel component="legend" style = {{marginBottom : "20px"}}>Padding</FormLabel>
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
										 let newConPadding = conPadding - 1 < 10 ? 10 : conPadding - 1;
										 setConPadding(newConPadding);
										 setProp((props) => (props.padding = newConPadding), 1000);
							 		 }}>-</div>
							<InputBase type="number"
												 value = {conPadding || 150} 
												 classes = {{input : classes.inputBaseInput}}
												 className = {classes.inputBase}
												 onChange = {(event) => {
													 setConPadding(event.target.value);
													 setProp((props) => (props.padding = event.target.value), 1000);
												 }} />
							<div className={classes.valueButton} id="increase" 
									 style = {{  marginLeft: "-4px", borderLeft : "1px solid rgba(255, 255, 255, 0.23)"}}
									 onClick={() => {
										 let newConPadding = conPadding + 1 > 720 ? 720 : conPadding + 1;
										 setConPadding(newConPadding);
										 setProp((props) => (props.padding = newConPadding), 1000);
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
	
export default withStyles( style, { withTheme: true } )( ContainerSettings )