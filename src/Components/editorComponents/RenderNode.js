import { useNode, useEditor } from '@craftjs/core';
import React from 'react';
import {Grid} from '@material-ui/core';

export const RenderNode = ({render}) => {
    // console.log({render})
    const { actions, query, connectors } = useEditor();
    const {name, isActive, isHover, connectors: { drag },} = useNode((node) => ({
        isActive: node.events.selected,
        isHover: node.events.hovered,
        name: node.data.custom.displayName || node.data.displayName,
      }));
    return (
      name !== "Image Component" ?
        isHover 
        ? isActive
          ? <div style={{outline : "2px #F05F40 solid", cursor : "move", outlineOffset : "-2px"}} >
              {render}
            </div>
          : <div style={{outline : "1px #F05F40 dashed", cursor : "move", outlineOffset : "-1px"}}>
              {render}
            </div>
        : isActive
          ? <div style={{outline : "2px #F05F40 solid", cursor : "move", outlineOffset : "-2px"}}>
              {render}
            </div>
          : <React.Fragment>{render}</React.Fragment>
      : <React.Fragment>{render}</React.Fragment>
  );
};

// display : name === "Image Component" ? "inline-block" : "block"