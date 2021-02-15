import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import { Editor, Frame, Element } from '@craftjs/core';
import {flags, olympics, filter} from './data.js'

import { withStyles } from '@material-ui/core/styles';
import {Grid, Button as MaterialButton} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { Container } from '../Components/userComponents/Container';
import { Button } from '../Components/userComponents/Button';
import { Image } from '../Components/userComponents/Image';
import { Card, CardBottom, CardTop  } from '../Components/userComponents/Card';
import {TwoColGrid} from '../Components/userComponents/TwoColGrid';
import {TwoRowGrid} from '../Components/userComponents/TwoRowGrid';
import { Text } from '../Components/userComponents/Text';
import {Blocks} from '../Components/userComponents/Blocks'
import {InnerGridItem} from '../Components/userComponents/InnerGridItem'


const styles = (theme) => ({
  resultParameter : {
		fontWeight : "bold",
	},
	secondaryText : {
		color : theme.palette.text.secondary
	},
	resultParameterCapital : {
		fontWeight : "bold",
		textTransform : "capitalize"
	},
	secondaryTextCapital : {
		color : theme.palette.text.secondary,
		textTransform : "capitalize"
	},
  gridRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflowX: 'auto',
		paddingRight : "5px",
		margin: "0px 4px 4px 4px!important",
		borderRadius: "6px",
		"&::-webkit-scrollbar": {
      display:"none"
    }
	},
  swipeListLeft: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    top: "40%",
    height: "48px",
    minHeight: "48px",
    width: "48px",
    backgroundColor: "rgba(0,0,0,0.7)",
    "&:hover": {
      backgroundColor: "#000",
    },
    color: "white"
  },
  swipeListRight: {
    position: "absolute",
    right: 0,
    top: "40%",
    height: "48px",
    minHeight: "48px",
    width: "48px",
    backgroundColor: "rgba(0,0,0,0.7)",
    "&:hover": {
      backgroundColor: "#000",
    },
    color: "white"
	},
})

class Output extends Component {
  constructor(props) {
    super(props);
    console.log("here", props.location.state.data.jsonNodes)
    this.state = {
      jsonNodes : props.location.state.data.jsonNodes,
      resultObject : {
        country: "Germany",
        flag_img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/100px-Flag_of_Germany.svg.png",
        flag_official_name: "Bundesflagge",
        flag_unofficial_name: "Federal Flag",
      },
      resultArr : olympics,
      disableScrollListLeft: true,
			disableScrollListRight: false,
      filterValues : filter,
      selectedFilters : {
        "Medal" : "",
        "Sport" : "",
        "Year" : "",
        "Sex" : "",
        Team : "",
      }
    }
    this.arrowListViewRef = React.createRef();
  }

  	// handler for left scroll
	handleScrollListLeft = () => {
		// scroll List towards left by 500px in 50px steps
		let initialScrollPos = this.arrowListViewRef.current.scrollLeft;
		let lastScrollPos = initialScrollPos, stepWidth = 50, totalScrollWidth = 500;
		let scrollInterval = setInterval(() => {
			this.arrowListViewRef.current.scrollLeft -= stepWidth;
			if (
				this.arrowListViewRef.current.scrollLeft <= initialScrollPos - totalScrollWidth ||
				lastScrollPos === this.arrowListViewRef.current.scrollLeft
			) {
				clearInterval(scrollInterval);
			}
			lastScrollPos = this.arrowListViewRef.current.scrollLeft;
		}, 50);
	};

	// handler for right scroll
	handleScrollListRight = () => {
		// Scroll List towards Right by 500px in 50px steps
		let initialScrollPos = this.arrowListViewRef.current.scrollLeft;
		let lastScrollPos = initialScrollPos, stepWidth = 50, totalScrollWidth = 500;
		let scrollInterval = setInterval(() => {
			this.arrowListViewRef.current.scrollLeft += stepWidth;
			if (
				this.arrowListViewRef.current.scrollLeft >= initialScrollPos + totalScrollWidth ||
				lastScrollPos === this.arrowListViewRef.current.scrollLeft
			) {
				clearInterval(scrollInterval);
			}
			lastScrollPos = this.arrowListViewRef.current.scrollLeft;
		}, 50);
	};

	// handler for disabling scroll on reaching extreme left or right end
	handleListScroll = (e)=>{
		// disable scroll options if scroll reaches end/beginning of list
		let thresholdWidth = 10;
		if(e.target.scrollLeft <= thresholdWidth && this.state.disableScrollListLeft === false){
			this.setState({
				disableScrollListLeft: true
			})
		}
		else if (e.target.scrollLeft > thresholdWidth && this.state.disableScrollListLeft === true){
			this.setState({
				disableScrollListLeft: false
			})
		}
		// check and disable scrollbutton if scroll is at extreme end
		if(e.target.scrollLeft + e.target.offsetWidth + thresholdWidth >= e.target.scrollWidth && this.state.disableScrollListRight === false){
			this.setState({
				disableScrollListRight: true
			})
		} 
		else if(e.target.scrollLeft + e.target.offsetWidth + thresholdWidth < e.target.scrollWidth && this.state.disableScrollListRight === true){
			this.setState({
				disableScrollListRight: false
			})
		}
	}

  replaceColumn = (text, data) => {
		const { classes, theme } = this.props;

    let newText = text.split(" ").map((item,index) => {
      if(item.substring(0,1) === "@"){
        return data[item.substring(1,item.length)]
      }else{
        return item
      }
    })

    return newText.join(" ")
  }

  formatJsonNodes = (data) => {
    let newJsonNodes = JSON.parse(JSON.stringify(this.state.jsonNodes))
    Object.keys(newJsonNodes).map(key => {
      let item = newJsonNodes[key]
      if(item.type && item.type.resolvedName === "Text"){
        item.props.text = this.replaceColumn(item.props.text, data)
      }
      if(item.type && item.type.resolvedName === "Image"){
        item.props.src = data[item.props.selectedColumn]
      }
    })
    // console.log("newJsonNodes",newJsonNodes, this.state.jsonNodes)
    return newJsonNodes
  }

  click = () => {
    this.setState({
      resultArr : []
    }
    ,() => {
      this.setState({
        resultArr : olympics.slice(4,8)
      })
    }
    )
  }
  
  render(){
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <div>
        {/*Object.keys(this.state.filterValues).map(filter => (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>{filter}</InputLabel>
            <Select
              id = {filter}
              value={this.state.selectedFilters[filter]}
              onChange={(id) => {this.filterHandleChange(id)}}
              label={filter}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.filterValues[filter].map(subFilter => (
                <MenuItem value={subFilter}>{subFilter}</MenuItem>
              ))}
            </Select>
          </FormControl>
              ))*/}
        </div>

        <div style = {{position : "relative"}}>
          <Grid className = {classes.gridRoot} ref={this.arrowListViewRef} onScroll={this.handleListScroll}>
            {!this.state.disableScrollListLeft &&
              <Fab disabled={this.state.disableScrollListLeft} size="small"
                  onClick={this.handleScrollListLeft} className={classes.swipeListLeft}>
                <KeyboardArrowLeftIcon fontSize="small" />
              </Fab>}
            {this.state.resultArr.length > 0 && this.state.resultArr.map(item => (
              <Editor enabled={false} resolver={{Card, Button, Text, Container, TwoColGrid, Image, TwoRowGrid, Blocks, InnerGridItem}}>
                <Frame data={this.formatJsonNodes(item)} />
              </Editor>
            ))}
            {!this.state.disableScrollListRight &&
              <Fab disabled={this.state.disableScrollListRight} onClick={this.handleScrollListRight}
                    className={classes.swipeListRight}>
                <KeyboardArrowRightIcon fontSize="small" />
              </Fab> }
          </Grid>
        </div>
        <MaterialButton onClick = {this.click} style = {{color : "#000"}}>Click Me</MaterialButton>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Output);

  // <Editor enabled={false} resolver={{Card, Button, Text, Container, TwoColGrid, Image}}>
  //   <Frame data={this.formatJsonNodes()} />
  // </Editor> 

//   ReactDOMServer.renderToStaticMarkup(
//     <Editor enabled={false} resolver={{Button, Text, Container}}>
//         <Frame json={JSONStateString} />
//     </Editor>);