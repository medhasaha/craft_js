import { useNode } from '@craftjs/core';
import React from 'react';
import ImageSettings from './ImageSettings.js';
import placeHolderImg from "./placeHolderImage/placeHolderImage.jpg";

export const Image = ({ src, height, width, selectedColumn, columnName}) => {
  // console.log(columnName)
  const { connectors: { connect, drag },} = useNode();
  return (
    <img
      ref={(ref) => connect(drag(ref))}
      style={{ objectFit : "cover", objectPosition : "center center"}}
      src = {src}
      width = {`${width}px`}
      height = {`${height}px`}/>
  );
};

export const ImageDefaultProps = {
  src : placeHolderImg,
  width : 150,
  height : 150, 
};

Image.craft = {
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};