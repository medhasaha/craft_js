import React, { useState } from "react";
import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from "@material-ui/core";
import { useEditor } from "@craftjs/core";
// import lz from "lzutf8";
// import copy from 'copy-to-clipboard';

export const Topbar = (props) => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));
  
  return (
      <Grid container alignItems="center" style = {{padding : "10px"}}>
        <Grid item xs>
          <FormControlLabel
            control={<Switch 
                      checked={enabled} 
                      color = "primary"
                      onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}
            label="Enable"
          />
        </Grid>
        <Grid item>
          <MaterialButton 
            size="small" 
            variant="outlined" 
            color="primary"
            onClick={() => {
              const json = query.serialize();
              props.getFinalObject(query.getSerializedNodes())
              // copy(lz.encodeBase64(lz.compress(json)));
              setSnackbarMessage("State copied to clipboard")
            }}>
             Go To Output
          </MaterialButton>
          <MaterialButton 
            size="small" 
            variant="outlined" 
            color="primary"
            onClick={() => {
              const json = query.serialize();
              props.showPreview(query.getSerializedNodes())
            }}>
             Preview
          </MaterialButton>
          <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!snackbarMessage}
            onClose={() => setSnackbarMessage(null)}
            message={<span>{snackbarMessage}</span>}
          />
        </Grid>
      </Grid>
  )
};