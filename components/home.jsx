import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './home/home.jsx';

const App = React.createFactory(AppComponent);
const mountNode = document.getElementById('app-mount');
const serverState = window.state;


ReactDOM.render(App(serverState), mountNode);
