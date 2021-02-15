import { Element, useNode } from '@craftjs/core';
import React from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';
import {InnerGridItem} from './InnerGridItem';
import {Container} from './Container';
import {Text} from './Text';


export const TwoRowGrid = ({ columnName }) => {
  const {  isActive, isHover,connectors: {connect, drag} } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
  }));  
  return (
    <React.Fragment>
    <Grid container
          ref={(ref) => connect(drag(ref))}
          spacing = {1} 
          style={{ margin: '5px 0', 
                   padding: "5px", 
                   width : "auto",
                   outline : isActive 
                              ? "2px #F05F40 solid" 
                              : isHover
                                ? "2px #F05F40 dashed"
                                : "none" ,
                   outlineOffset: "-2px",
                   cursor : isHover || isActive ? "move" : "pointer"}}>
      <Element id = "grid1" canvas is={InnerGridItem} xs = {12} md = {12}>
        <Text text="Add Text..." columnName = {columnName}/>
      </Element>
      <Element id = "grid2" canvas is={InnerGridItem} xs = {12} md = {12}>
        <Text text="Add Text..." columnName = {columnName}/>
      </Element>
    </Grid>
    </React.Fragment>
  );
};

export const TwoRowGridDefaultProps = {
  background: '#ffffff',
  padding: 5,
};

TwoRowGrid.craft = {
  displayName: "Row Grid",
  props: TwoRowGridDefaultProps,
};