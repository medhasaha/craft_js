import { useNode } from '@craftjs/core';
import { Grid } from '@material-ui/core';
import React from 'react';

export const InnerGridItem = ({ xs, md, children }) => {
	const {  isActive, isHover,connectors: {connect, drag} } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
  }));
  
  return (
    <Grid item xs = {xs} md = {md} ref={(ref) => connect(ref)}
					style={{outline :isActive 
                            ? "2px #ddd solid" 
                            : isHover
                              ? "2px #ddd dashed"
                              : "none" ,
                  // outlineOffset: "-2px",
                  cursor : isHover || isActive ? "move" : "pointer",
                }}>
      {children}
    </Grid>
  );
};

export const InnerGridItemDefaultProps = {
  xs : 12,
  md : 12,
};

InnerGridItem.craft = {
  displayName: "Grid Item",
  props: InnerGridItemDefaultProps,
};