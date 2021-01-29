// components/SettingsPanel.js
import React, { Component } from 'react'
import { Card as MaterialCard, Chip, Grid, Typography, Button as MaterialButton, Divider} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { useEditor } from "@craftjs/core";

const style = theme => ({
  gridItem : {
    padding : "16px"
  },
  gridItemCenter : {
    padding : "16px",
    textAlign : "center"
  }
})

const SettingsPanel = (props) => {
  const { classes, theme } = props

  const { actions, selected }  = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if ( currentNodeId ) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable()
      };
      props.returnSelectedValue(true)
    }else{
      props.returnSelectedValue(false)
    }

    return {
      selected
    }
  });

  return selected ? (    
      <Grid container>
        <Grid item xs = {12} className = {classes.gridItemCenter}>
          <Typography variant="button">
            {"Customize"} 
          </Typography>
        </Grid>
        <Grid item xs = {12} className = {classes.gridItem}>
          <Typography variant="subtitle1" style = {{display : "inline", color : "rgba(255, 255, 255, 0.7)"}}>
            {"Selected : "} 
          </Typography>
          <Typography variant="subtitle1" style = {{display : "inline"}}>
            {selected.name} 
          </Typography>
        </Grid>
        <Grid item xs = {12}>
          <Divider style = {{height : "1px", width : "100%"}}/>
        </Grid>
        <Grid item xs = {12}>
          { selected.settings && React.createElement(selected.settings)}
        </Grid>
        <Grid item xs = {12} className = {classes.gridItem}>
          {selected.isDeletable 
            ? <MaterialButton
                variant="outlined" 
                color="primary"                
                style = {{width : "100%"}}
                onClick={() => {
                  actions.delete(selected.id);
                }}>
                Delete
              </MaterialButton>
            : null}
        </Grid>
      </Grid>
  ) : null
}

export default withStyles( style, { withTheme: true } )( SettingsPanel )

//    {/*<MaterialCard style = {{padding : "10px"}}>*/}
