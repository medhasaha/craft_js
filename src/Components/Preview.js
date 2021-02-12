import React, { useState, useEffect } from "react";
import {Editor, Frame, Element} from "@craftjs/core";

import { useEditor } from "@craftjs/core";
import {PreviewHelper} from './PreviewHelper.js'

import { Container } from '../Components/userComponents/Container';
import { Button } from '../Components/userComponents/Button';
import { Image } from '../Components/userComponents/Image';
import { Card, CardBottom, CardTop  } from '../Components/userComponents/Card';
import { Text } from '../Components/userComponents/Text';
import {TwoColGrid} from '../Components/userComponents/TwoColGrid'
import {TwoRowGrid} from '../Components/userComponents/TwoRowGrid'
import {Blocks} from '../Components/userComponents/Blocks'

const LoadFromLocalStorage = (props) => {
  const { actions } = useEditor();
  actions.deserialize(props.data);
  return null;
};

export const Preview = (props) => {
  const { query, actions } = useEditor((state) => ({
  }));

  // const [nodessss,setNodes] = useState(query.getSerializedNodes());
  // console.log(query.serialize())
  // const getUpdatedNodes = () => {
  //   console.log("inside func............",)
  //   // actions.deserialize(query.getSerializedNodes());
  //  return query.getSerializedNodes()
  // };

  
  return (
    <Editor enabled={false} resolver={{Card, Button, Text, Container, TwoColGrid, Image, TwoRowGrid, Blocks}}
            onNodesChange={query => {
              // setNodes(query.getSerializedNodes())
              // actions.deserialize(query.getSerializedNodes());
            }}
            >
      {/*<Frame key = {Math.random()} data={query.getSerializedNodes()} />*/}
      {/*<Frame  data={getUpdatedNodes()} />*/}
      <PreviewHelper data = {query.getSerializedNodes()}/>
      <Frame>
				<Element canvas is={Card}>
					{<TwoColGrid/>}
				</Element>
          </Frame>
    </Editor>
   )
};

   