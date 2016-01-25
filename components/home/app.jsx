import React from 'react';
import Relay from 'react-relay';

import AppComponent from './home.jsx';
import HomeRoute from '../routes/HomeRoute.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={AppComponent}
        route={new HomeRoute} />
    );
  }
}