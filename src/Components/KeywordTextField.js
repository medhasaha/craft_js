import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Popover from '@material-ui/core/Popover';


const styles = (theme) => ({
	textFieldQues : {
		// fillWidth : true,
    // size: "small",
    // display: 'flex',
    // wrap: 'nowrap',
		// margin: "0px 20px 0px 0px",
		width : "100%"
	},
	secondaryText : {
		color : theme.palette.text.secondary
	},
	highlight : {
		color : theme.palette.text.secondary,
		fontWeight : 900
	},
	paper : {
		position: "fixed",
    left: "160px",
    marginTop: "61px",
    zIndex : 100,
	},
	paperStyle : {
		display : "inline-block",
		boxShadow : "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
	},
	infoIcon : {
		cursor : "pointer",
		color : theme.palette.text.secondary
	},
})

class KeywordTextField extends Component {
	constructor(props) {
    super(props)
		// console.log("KeywordTextField", this.props)

		this.state = {
			keyword : this.props.keyword,
			displayList : "",
			flagBackspace : false,
			flagEnter : false,
			cursorPosition : "",
			// anchorEl : null,
			selectedValue : "",
			highlightedValue : "",
			// listOptions : ["date", "holiday"],
		}
	}

	componentDidMount(){
		
	}

	// keywordTextChangeHandler = (e) => {
	// 	this.setState({
	// 		keyword : e.target.value,
	// 	});
	// }

	keywordTextChangeHandler = (e) => {
		let prev = this.state.keyword;
		// let latestAlphabet = e.target.value.substring(e.target.value.length-1, e.target.value.length)
		if(e.target.value[e.target.selectionStart - 1] === "@"){//open List if @ is typed
			this.setState({
				displayList : true,
				// anchorEl : e.currentTarget
			})
		}

		if(e.target.value[e.target.selectionStart - 1] === " "){// close list if no value selected and space is typed
			this.setState({
				displayList : false,
				highlightedValue : "",
			})
		}

		this.getHighlightedItem(e.target.value);

		//on pressing backspace
		let flag_backspace = false;
		let newString = "";
		// let _prev = [];
		if(this.state.flagBackspace === true){
			for (let i = e.target.selectionStart ; i >= 0 ; i--){
				if(prev[i] === " ") break; //if space was deleted do nothing
				else if(prev[i] === "@"){
						flag_backspace = true
						let lastIndex = e.target.value.length
						for(let j = e.target.selectionStart + 1; j < prev.length ; j++){
							if (prev[j] === " "){ lastIndex = j; break;}//instead of prev e.target.value
						}
						newString = prev.substring(0,i) + prev.substring(lastIndex + 1, prev.length) 
						this.setState({
							displayList : false
						})
						break;
				}
			}

			// let current = e.target.value.split(" ");
			// _prev = prev.split(" ");
			// for (var a = 0; a < current.length; a++) {
			// 	if(_prev[a].substring(0,1) === "@"){
			// 		if (current[a] != _prev[a]) {
			// 			flag_backspace = true
			// 			_prev.splice(a, 1);
			// 			this.setState({
			// 				displayList : false
			// 			})
			// 			break;
			// 		}
			// 	}
			// }
		}

		this.setState({
			// keyword : flag_backspace === false ? e.target.value : _prev.join(" "),
			keyword : flag_backspace === false ? e.target.value : newString,
			flagBackspace : false,
			cursorPosition : e.target.selectionStart
		}
		, () => {this.props.setKeyword(this.state.keyword, this.props.index)}
		);
	}

	onKeyPressHandler = (event) => {
		if (event.keyCode == '8'){//backspace
			this.setState({
				flagBackspace : true,
			})
		}
		if((event.keyCode == '13' || event.keyCode == '9') && this.state.highlightedValue !== ""){ //enter or tab
			let newKeyword = this.state.keyword
			newKeyword = this.addColumnToKeyword(this.state.highlightedValue, this.state.keyword, this.state.cursorPosition)
			this.setState({
				selectedValue : this.state.highlightedValue,
				keyword : newKeyword,
				displayList : false,
				highlightedValue : "" //set to empty else whenever we press enter same value appended
			}, () => {this.props.setKeyword(this.state.keyword, this.props.index)}
			)
		}
	}

	getSelectedValue  = (value, keyword, cursorPosition) => {
		let newKeyword = this.addColumnToKeyword(value, keyword, cursorPosition)

		this.setState({
			selectedValue : value,
			// keyword : this.state.keyword + value,
			keyword : newKeyword,
			displayList : false,
		}, () => {this.props.setKeyword(this.state.keyword, this.props.index)}
		)
	}

	addColumnToKeyword = (value, keyword, cursorPosition) => {
		let newKeyword = keyword
		let pos = 0;
		for (let i = cursorPosition ; i >= 0 ; i--){
			if(newKeyword[i] === "@"){
				pos = i + 1
				break;
			}
		}

		if(cursorPosition === keyword.length){ //when is | (| - cursor)
			newKeyword = newKeyword.slice(0, pos) + value;
		}else{
			if (newKeyword[pos] === " ") // when | is 
			  newKeyword = newKeyword.slice(0, pos) + value + newKeyword.slice(cursorPosition);
			else // when |is
			  newKeyword = newKeyword.slice(0, pos) + value + " " + newKeyword.slice(cursorPosition);
		}

		return newKeyword;
	}

	getHighlightedItem  = (keyword) => {
		if (this.state.displayList === true){
			let pos = 0;
				for (let i = this.state.cursorPosition ; i >= 0 ; i--){
					if(keyword[i] === "@"){
						pos = i + 1
						break;
					}
				}

			for(let i = 0 ; i < this.props.fileColumns.length ; i ++){
				let item = this.props.fileColumns[i]
				if (keyword.substring(pos, this.state.cursorPosition + 1) !== "" 
				    && item.startsWith(keyword.substring(pos, this.state.cursorPosition + 1))){
					this.setState({
						highlightedValue : item
					})
					break;
				}else{
					this.setState({
						highlightedValue : ""
					})
				}
			}
		}
	}

	getListItem = (item, keyword, cursorPosition) => {
		const { classes, theme } = this.props;
		if (this.state.displayList === true){
			let pos = 0;
			for (let i = cursorPosition ; i >= 0 ; i--){
				if(keyword[i] === "@"){
					pos = i + 1
					break;
				}
			}
			
			if (keyword.substring(pos, cursorPosition) !== "" && item.startsWith(keyword.substring(pos, cursorPosition))){
				let highlight = item.substring(0,keyword.substring(pos, cursorPosition).length);
				let nonHighlight = item.substring(keyword.substring(pos, cursorPosition).length, item.length)
				// if(this.state.highlightedValue === ""){
				// 	this.setState({
				// 		highlightedValue : item
				// 	})
				// }
				return  ( <React.Fragment>
									  <span className = {classes.highlight}>{highlight}</span>
									  <span>{nonHighlight}</span>
	 							  </React.Fragment>)
			}else {
				return item;
			}
		}
	}

	render() {
    const { classes, theme } = this.props;
		return (
			<React.Fragment>
			<TextField className = {classes.textFieldQues} variant = "outlined" 
			           label = {this.props.label}
								 value = {this.state.keyword}
								 InputProps={{
									endAdornment: this.props.showInputProps === true
																? <InputAdornment position="end">
																		{this.props.index === 0 ?
																			<Tooltip title={this.props.tooltipTitle} placement="top">
																				<InfoIcon className = {classes.infoIcon}/>
																			</Tooltip>
																			: null}
																	</InputAdornment> 
																: null
								 }}
								 error = {this.props.error === true && this.props.errorIndex === this.props.index ? this.props.error : false}
								 helperText={this.props.error && this.props.errorIndex === this.props.index  && this.props.errorMessage ? this.props.errorMessage : null}
								 onChange = {(e) => this.keywordTextChangeHandler(e)}
								 onKeyDown = {(e) => this.onKeyPressHandler(e)}/>

			{/*<Popover open = {this.state.displayList} anchorEl={this.state.anchorEl}
								 anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
								 transformOrigin={{ vertical: 'top', horizontal: 'left'}}
								 style = {{marginLeft : 8 * this.state.cursorPosition < 500 ? 10 * this.state.cursorPosition : 500}}>*/}
			
			{this.state.displayList === true &&
				<Paper className = {classes.paperStyle}>
					<List style = {{display : this.state.displayList === true ? "block" : "none"}}>
						{this.props.fileColumns.length > 0 
							? this.props.fileColumns.map((item,index) => (
									<ListItem button key = {index} selected = {this.state.highlightedValue === item}
									          onClick = {() => this.getSelectedValue(item, this.state.keyword, this.state.cursorPosition)}>
										<ListItemText primary={this.getListItem(item, this.state.keyword, this.state.cursorPosition)}/>
									</ListItem>
								))
							: <ListItem button>
									<ListItemText primary = "No Options" className = {classes.secondaryText}/>
								</ListItem>
						}
					</List>
				</Paper>}
				{/*</Popover>*/}
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(KeywordTextField);