import { useNode } from '@craftjs/core';
import {
  Button as MaterialButton,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import React from 'react';

export const Button = ({ size, variant, color, text }) => {
  const { connectors: { connect, drag },} = useNode();
  return (
    <MaterialButton
      ref={(ref) => connect(drag(ref))}
      style={{ margin: '5px', cursor : "move" }}
      size={size}
      variant={variant}
      color={color}>
      {text}
    </MaterialButton>
  );
};

export const ButtonDefaultProps = {
  size: 'small',
  variant: 'contained',
  color: 'primary',
  text: 'Click me',
};

Button.craft = {
  props: ButtonDefaultProps,
};