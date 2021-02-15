import { useNode } from '@craftjs/core';
import { Slider } from '@material-ui/core';
import { Paper, Grid, FormControl, FormLabel  } from '@material-ui/core';
import ContainerSettings from './ContainerSettings.js';
import React from 'react';
import {InnerGridItem} from './InnerGridItem.js';

export const Container = ({ padding, columnName }) => {
  const {  isActive, isHover,connectors: {connect, drag} } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
  }));    
  
  return (
    <Grid 
      container
      ref={(ref) => connect(drag(ref))}
      spacing = {1}
      style={{ margin: '5px 0px', 
               padding: `${padding}px`,
               width : "auto",  
               outline : isActive 
                          ? "2px #F05F40 solid" 
                          : isHover
                            ? "2px #F05F40 dashed"
                            : "none" ,
               outlineOffset: "-2px",
               cursor : isActive || isHover ? "move" : "pointer",
            }}>
      <Element id = "grid1" canvas is={InnerGridItem} xs = {12} md = {12}>
        <Text text="Add Text..." columnName = {columnName}/>
      </Element>
    </Grid>
  );
};

export const ContainerDefaultProps = {
  // background: '#ffffff',
  padding: 5,
};

Container.craft = {
  displayName: "Box",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};