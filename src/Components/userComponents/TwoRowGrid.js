import { Element, useNode } from '@craftjs/core';
import React from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';

import {Container} from './Container';
import {Text} from './Text';


export const TwoRowGrid = ({ background, padding = 20, columnName }) => {
  const {connectors: { connect, drag },} = useNode();
  return (
    <React.Fragment>
    <Grid container
          ref={(ref) => connect(drag(ref))}
          spacing = {1} 
          style={{ margin: '5px 0', padding: `${padding}px`}}>
      <Grid item xs = {12}>
        <Element id = "grid1" canvas is={Container} padding={5}>
          <Text text="Add Text..." columnName = {columnName}/>
        </Element>
      </Grid>
      <Grid item xs = {12}>
        <Element id = "grid2" canvas is={Container} padding={5}>
          <Text text="Add Text..." columnName = {columnName}/>
        </Element>
      </Grid>
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