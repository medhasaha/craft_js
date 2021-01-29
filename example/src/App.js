import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Base from 'hd-grapesjs';
import themes from './theme';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles'

export default class App extends Component {
  constructor(props){
    super(props);
    themes.hyperDart.palette.type="dark";
    this.theme=createMuiTheme(themes.hyperDart);
    console.log("[App] theme: ",this.theme.palette);
  }

  render () {
    return (
      <div>
        <MuiThemeProvider theme={this.theme}>
          <BrowserRouter>
              <Route path="/test" render={(props) => <Base {...props}/>} />
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    )
  }
}


