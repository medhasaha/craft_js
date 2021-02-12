// components/Toolbox.js
import React from "react";
import { Card as MaterialCard, Typography, Grid, Button as MaterialButton, IconButton, Divider } from "@material-ui/core";
import { Element, useEditor } from "@craftjs/core";
import { withStyles } from '@material-ui/core/styles';


import { Container } from '../../Components/userComponents/Container';
import { Button } from '../../Components/userComponents/Button';
import { Image } from '../../Components/userComponents/Image';
import { Card, CardBottom, CardTop  } from '../../Components/userComponents/Card';
import { Text } from '../../Components/userComponents/Text';
import {TwoColGrid} from '../../Components/userComponents/TwoColGrid'
import {TwoRowGrid} from '../../Components/userComponents/TwoRowGrid'
import {Blocks} from '../../Components/userComponents/Blocks'

import textIcon from './icons/text.svg'
import imageIcon from './icons/img.svg'
import boxGridIcon from './icons/box_grid.svg'
import twoColGridIcon from './icons/two_col_grid.svg'
import * as icons from './svgIcons.js'



const style = theme => ({
  logo : {
		height : "40px",
		width : "40px"
	},
})

const Toolbox = (props) => {
  const { classes, theme } = props
  const { connectors, query } = useEditor();
  return (
    <MaterialCard style = {{padding : "14px"}}>
      <Grid container spacing={1}>
        <Grid item xs = {12} style = {{textAlign : "center"}}>
          <Typography variant = "button">
            Drag to add
          </Typography>
        </Grid>
        <Grid item xs = {12}>
         <Typography variant = "button">Layouts</Typography>
        </Grid>
        <Grid item xs = {3}>
          <IconButton ref={ref=> connectors.create(ref, <Element is={TwoColGrid} padding={20} canvas columnName = {props.columnName}/>)}
                      // ref={ref=> connectors.create(ref, <TwoColGrid/> ) }
                          >
            {/*<img src = {twoColGridIcon} className = {classes.logo}/>*/}
            {icons.two_col_grid(theme.palette.type)}
          </IconButton>
        </Grid>
        <Grid item xs = {3}>
          <IconButton ref={ref=> connectors.create(ref, <Element is={TwoRowGrid} canvas columnName = {props.columnName}/>)}>
            {icons.two_row_grid(theme.palette.type)}
          </IconButton>
        </Grid>
        <Grid item xs = {3}>
          <IconButton ref={ref=> connectors.create(ref, <Element is={Blocks} canvas columnName = {props.columnName}/>)}>
            {icons.blocks(theme.palette.type)}
          </IconButton>
        </Grid>
        <Grid item xs = {3}>
          <IconButton ref={ref=> connectors.create(ref, <Element is={Container} canvas />)}>
            {icons.box_grid(theme.palette.type)}
          </IconButton>
        </Grid>
        <Grid item xs = {12}>
          <Divider width = "100%"/>
        </Grid>
        <Grid item xs = {12}>
          <Typography variant = "button">Elements</Typography>
        </Grid>
        <Grid item xs = {3}>
          <IconButton ref={ref=> connectors.create(ref, <Text text="Add Text..." columnName = {props.columnName}/> ) }>
            {icons.text(theme.palette.type)}
          </IconButton>
        </Grid>
        <Grid item xs = {3}>
          <IconButton ref={ref=> connectors.create(ref, <Image selectedColumn = {props.selectedColumn} columnName = {props.columnName}/> ) }>
            {icons.img(theme.palette.type)}
          </IconButton>
      </Grid>
      </Grid>
    </MaterialCard>
  )
};

export default withStyles( style, { withTheme: true } )( Toolbox )