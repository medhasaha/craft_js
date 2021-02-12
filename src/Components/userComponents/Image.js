import { useNode } from '@craftjs/core';
import React from 'react';
import ImageSettings from './ImageSettings.js';
import placeHolderImg from "./placeHolderImage/download.png";

export const Image = ({ src, height, width, selectedColumn, columnName}) => {
  // console.log(columnName)
  const { isActive, isHover, connectors: { connect, drag },} = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
  }));
  // console.log(isActive, isHover)
  return (
    <img
      ref={(ref) => connect(drag(ref))}
      style={{ objectFit : "cover", objectPosition : "center center", 
               border : isHover 
                        ? isActive
                          ? "2px #F05F40 solid"
                          : "1px #F05F40 dashed"
                        : isActive
                          ? "2px #F05F40 solid"
                          : "none",
               cursor : isHover || isActive ? "move" : "pointer"}}
      src = {src}
      width = {`${width}%`}
      height = {`${height}px`}
      onError={event => {
        event.target.onerror = null;
        event.target.src = placeHolderImg;
      }}/>
  );
};

export const ImageDefaultProps = {
  src : placeHolderImg,
  width : 100,
  height : 150, 
};

Image.craft = {
  displayName: "Image Component",
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};