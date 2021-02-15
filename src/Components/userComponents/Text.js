// components/user/Text.js
import React from "react";
import { useNode } from "@craftjs/core";
import TextSettings from './TextSettings.js';
import { Typography} from '@material-ui/core';

export const Text = ({text, fontSize, columnName}) => {
  const {  isActive, isHover,connectors: {connect, drag} } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
  }));
  return (
    <Typography ref={ref => connect(drag(ref))} 
                style = {{fontSize : `${fontSize}px`, 
                          outline : isActive 
                                    ? "2px #F05F40 solid" 
                                    : isHover
                                      ? "2px #F05F40 dashed"
                                      : "none" ,
                          outlineOffset: "-2px",
                          cursor : isHover || isActive ? "move" : "pointer",
                        }}>
      {text}
    </Typography>
  )
}

export const TextDefaultProps = {
  text: 'Hi',
  fontSize: 14,
};

Text.craft = {
  displayName: "Text Element",
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};