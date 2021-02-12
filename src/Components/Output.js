import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import { withStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import { Editor, Frame, Element } from '@craftjs/core';

import { Container } from '../Components/userComponents/Container';
import { Button } from '../Components/userComponents/Button';
import { Image } from '../Components/userComponents/Image';
import { Card, CardBottom, CardTop  } from '../Components/userComponents/Card';
import {TwoColGrid} from '../Components/userComponents/TwoColGrid';
import {TwoRowGrid} from '../Components/userComponents/TwoRowGrid';
import { Text } from '../Components/userComponents/Text';
import {Blocks} from '../Components/userComponents/Blocks'


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
	}
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
      resultArr : 
        [{
          country: "Germany",
          flag_img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/100px-Flag_of_Germany.svg.png",
          flag_official_name: "Bundesflagge",
          flag_unofficial_name: "Federal Flag",
        },
        {
          country: "India",
          flag_img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/100px-Flag_of_India.svg.png",
          flag_official_name: "Tiranga",
          flag_unofficial_name: "The Tricolor",
        },
        {
          country: "Scotland",
          flag_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/100px-Flag_of_Scotland.svg.png",
          flag_official_name: "Bratach-Croise",
          flag_unofficial_name: "Saltire",
        },
        {
          country: "Brazil",
          flag_img: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/100px-Flag_of_Brazil.svg.png",
          flag_official_name: "A Auriverde",
          flag_unofficial_name: "The Gold And Green",
        }]
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
  
  render(){
    const { classes, theme } = this.props;
    return (
      <Grid className = {classes.gridRoot}>
     { this.state.resultArr.length > 0 && this.state.resultArr.map(item => (
          <Editor enabled={false} resolver={{Card, Button, Text, Container, TwoColGrid, Image, TwoRowGrid, Blocks}}>
            <Frame data={this.formatJsonNodes(item)} />
          </Editor>
      ))}
      </Grid>
    )
  }
 

//   ReactDOMServer.renderToStaticMarkup(
//     <Editor enabled={false} resolver={{Button, Text, Container}}>
//         <Frame json={JSONStateString} />
//     </Editor>);
}

export default withStyles(styles)(Output);