import { useNode } from '@craftjs/core';
import { Slider } from '@material-ui/core';
import { Paper, Grid, FormControl, FormLabel  } from '@material-ui/core';
import ContainerSettings from './ContainerSettings.js';
import React from 'react';

export const Container = ({ background, padding, children }) => {
  const {connectors: { connect, drag },} = useNode();
  return (
    <Grid container
      ref={(ref) => connect(drag(ref))}
      style={{ margin: '5px 0px', padding: `${padding}px`}}>
        <Grid item xs = {12}>
          {children}
        </Grid>
    </Grid>
  );
};

export const ContainerDefaultProps = {
  // background: '#ffffff',
  padding: 10,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};