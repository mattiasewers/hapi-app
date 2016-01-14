import React from 'react';
import {FlatButton, TextField, CircularProgress} from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Relay from 'react-relay';

import Test from './test'

injectTapEventPlugin();

import '../../styles/home.styl';

export default class HomeComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    }
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {

    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      primary1Color: Colors.red500,
      primary2Color: Colors.red700,
      primary3Color: Colors.lightBlack,
      accent1Color: Colors.indigo500,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
      textColor: Colors.darkBlack,
    });

    this.setState({muiTheme: newMuiTheme});
  }

  render() {
    let data = this.state.data;

      return (
          <section className="todo">
            <h2>Add todo</h2>
            <form method="post">
              <TextField
                hintText="Add todo" ref="text"
                underlineFocusStyle={{borderColor: Colors.indigo500}} />
              <FlatButton label="add" primary={true} />
            </form>
              <li>test</li>
          </section>
      );
  }
};

HomeComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
};
