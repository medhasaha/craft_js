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
        isHover 
        ? isActive
          ? <div style={{border : "2px #F05F40 solid", display : name === "Image" ? "inline-flex" : "block", cursor : "move"}} >
              {render}
            </div>
          : <div style={{border : "1px #F05F40 dashed" ,display : name === "Image" ? "inline-flex" : "block", cursor : "move"}}>
              {render}
            </div>
        : isActive
          ? <div style={{border : "2px #F05F40 solid", display : name === "Image" ? "inline-flex" : "block", cursor : "move"}}>
              {render}
            </div>
          : <React.Fragment>{render}</React.Fragment>
  );
};