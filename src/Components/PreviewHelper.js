import React, { useState, useEffect, useCallback } from "react";
import {Editor, Frame, Element} from "@craftjs/core";
import { Button as MaterialButton } from "@material-ui/core";


import { useEditor } from "@craftjs/core";

export const PreviewHelper = (props) => {
	const { query, actions } = useEditor((state) => ({
	}));
  // console.log(props.data)
  //   actions.deserialize(props.data);  

  // const onStorageChange = useCallback(() => {
	// 	console.log("here")
  //   actions.deserialize(props.data);  
  // },[],
	// );

	// React.useEffect(() => {
	// 	console.log("there")
	// 	actions.deserialize(props.data);  
  // }, [props.data]);
	
  return (
    <React.Fragment>
			<MaterialButton onClick={() => {actions.deserialize(props.data);}} 
										color="primary" autoFocus>
				Preview
			</MaterialButton>
			{/*memoizedCallback()*/}
    </React.Fragment>
   )
};

   