import { Element, useNode } from '@craftjs/core';
import React from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';

import {Container} from './Container';
import {Text} from './Text';
import {Image} from './Image';


export const Blocks = ({ padding = 20, columnName }) => {
  const {connectors: { connect, drag },} = useNode();
  return (
    <React.Fragment>
    <Grid container
          ref={(ref) => connect(drag(ref))}
          spacing = {1} 
          style={{ margin: '5px 0', padding: `${padding}px`}}>
      <Grid item xs = {4}>
        <Element id = "grid1" canvas is={Container} padding={5}>
				  <Image selectedColumn = {columnName[0]} columnName = {columnName}/>
        </Element>
      </Grid>
      <Grid item xs = {8}>
				<Element id = "grid2" canvas is={Container} padding={5}>
					<Text text="Add Text..." columnName = {columnName}/>
				</Element>
			</Grid>
      <Grid item xs = {12}>
        <Element id = "grid3" canvas is={Container} padding={5}>
          <Text text="Add Text..." columnName = {columnName}/>
        </Element>
      </Grid>
    </Grid>
    </React.Fragment>
  );
};

export const BlocksDefaultProps = {
  padding: 3,
};

Blocks.craft = {
  displayName: "Block Grid",
  props: BlocksDefaultProps,
};