import { useNode } from '@craftjs/core';
import React from 'react';
import {Card as MaterialCard} from '@material-ui/core';

import { Button } from './Button';
import {
  Container,
  // ContainerSettings,
  // ContainerDefaultProps,
} from './Container';
import { Text } from './Text';

// export const CardTop = ({ children }) => {
//   const {
//     connectors: { connect },
//   } = useNode();
//   return (
//     <div
//       ref={connect}
//       className="text-only"
//       style={{
//         padding: '10px',
//         marginBottom: '10px',
//         borderBottom: '1px solid #eee',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// CardTop.craft = {
//   rules: {
//     canMoveIn: (incomingNode) => incomingNode.data.type === Text,
//   },
// };

// export const CardBottom = ({ children }) => {
//   const {
//     connectors: { connect },
//   } = useNode();
//   return (
//     <div style={{ padding: '10px 0' }} ref={connect}>
//       {children}
//     </div>
//   );
// };

// CardBottom.craft = {
//   rules: {
//     canMoveIn: (incomingNode) => incomingNode.data.type === Button,
//   },
// };

// export const Card = ({ background, padding = 20 }) => {
//   return (
//     <Container background={background} padding={padding}>
//       <Element canvas id="text" is={CardTop}>
//         <Text text="Only texts" fontSize={20} />
//         <Text text="are allowed up here" fontSize={15} />
//       </Element>
//       <Element canvas id="buttons" is={CardBottom}>
//         <Button size="small" text="Only buttons down here" />
//       </Element>
//     </Container>
//   );
// };

export const Card = ({children})  => {
  const {  isActive, isHover,connectors: {connect, drag} } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
  })); 
   
  return(
    <MaterialCard 
      ref={(ref) => connect(drag(ref))}
      style = {{
                // width : "auto", 
                // maxWidth : "150px",
                // maxHeight : "520px", 
                padding: "5px", 
                margin: "4px",
                outline :isActive 
                          ? "2px #F05F40 solid" 
                          : isHover
                            ? "2px #F05F40 dashed"
                            : "none" ,
                outlineOffset: "-2px",
                cursor : isHover || isActive ? "move" : "pointer",
                width : "150px",
                flex: "0 0 auto",
              }}>
      {children}
    </MaterialCard>
  );
};

export const CardDefaultProps = {
  padding : 10,
  margin : 4,
};

Card.craft = {
  displayName: "Card",
  props: CardDefaultProps,
  // related: {
    // settings: ContainerSettings,
  // },
};