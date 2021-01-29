import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import { withStyles } from '@material-ui/core/styles';
import { Editor, Frame, Element } from '@craftjs/core';

import { Container } from '../Components/userComponents/Container';
import { Button } from '../Components/userComponents/Button';
import { Image } from '../Components/userComponents/Image';
import { Card, CardBottom, CardTop  } from '../Components/userComponents/Card';
import {TwoColGrid} from '../Components/userComponents/TwoColGrid'
import { Text } from '../Components/userComponents/Text';

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
      }
    }
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

  formatJsonNodes = () => {
    let newJsonNodes = {...this.state.jsonNodes}
    Object.keys(newJsonNodes).map(key => {
      // console.log(newJsonNodes[key])
      let item = newJsonNodes[key]
      if(item.type.resolvedName === "Text"){
        item.props.text = this.replaceColumn(item.props.text)
        console.log(key, item.props.text)
      }
      if(item.type.resolvedName === "Image"){
        console.log(item.props.columnName[0])
        console.log(this.state.resultObject[item.props.selectedColumn])
        item.props.src = this.state.resultObject[item.props.selectedColumn]
      }
    })
    console.log("newJsonNodes",newJsonNodes, this.state.jsonNodes)
    return newJsonNodes
  }
  
  render(){
    return (
      <Editor enabled={false} resolver={{Card, Button, Text, Container, TwoColGrid, Image}}>
        <Frame data={this.formatJsonNodes()} />
      </Editor>
    )
  }
 

//   ReactDOMServer.renderToStaticMarkup(
//     <Editor enabled={false} resolver={{Button, Text, Container}}>
//         <Frame json={JSONStateString} />
//     </Editor>);
}

export default withStyles(styles)(Output);