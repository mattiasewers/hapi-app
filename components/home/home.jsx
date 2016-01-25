import React from 'react';
import {FlatButton, TextField, CircularProgress} from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Relay from 'react-relay';

import '../../styles/home.styl';

class HomeComponent extends React.Component {

  render() {
    const {edges} = this.props.peopleRelay;
      return (
          <section className="todo">
            <form method="post">
              {edges.map(({node}, i) => <p key={i}>{node.email}</p>)}
              <TextField
                hintText="Add todo" ref="text"
                underlineFocusStyle={{borderColor: Colors.indigo500}} />
              <FlatButton label="add" primary={true} />
            </form>
          </section>
      );
  }
};

export default Relay.createContainer(HomeComponent, {
  fragments: {
    peopleRelay: () => Relay.QL`
      fragment on PersonConnection {
        edges{
          node{
            email
          }
        }
      }
    `,
  }
});
