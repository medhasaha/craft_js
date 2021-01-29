import { Element, useNode } from '@craftjs/core';
import React from 'react';
import {Typography, Paper, Grid} from '@material-ui/core';

import {Container} from './Container';
import {Text} from './Text';


export const TwoColGrid = ({ background, padding = 20, columnName }) => {
  const {connectors: { connect, drag },} = useNode();
  return (
    <React.Fragment>
    <Grid container
          ref={(ref) => connect(drag(ref))}
          spacing = {1} 
          style={{ margin: '5px 0', padding: `${padding}px`}}>
      <Grid item xs = {6}>
        <Element id = "grid1" canvas is={Container} padding={5}>
          <Text text="Add Text..." columnName = {columnName}/>
        </Element>
      </Grid>
      <Grid item xs = {6}>
        <Element id = "grid2" canvas is={Container} padding={5}>
          <Text text="Add Text..." columnName = {columnName}/>
        </Element>
      </Grid>
    </Grid>


    {/*<Container background={background} padding={padding}>
      <Element canvas id="text" is={CardTop}>
        <Text text="Only texts" fontSize={20} />
        <Text text="are allowed up here" fontSize={15} />
      </Element>
      <Element canvas id="buttons" is={CardBottom}>
        <Button size="small" text="Only buttons down here" />
      </Element>
    </Container>*/}
    </React.Fragment>
  );
};

export const TwoColGridDefaultProps = {
  background: '#ffffff',
  padding: 3,
};

TwoColGrid.craft = {
  props: TwoColGridDefaultProps,
  // related: {
    // settings: ContainerSettings,
  // },
};