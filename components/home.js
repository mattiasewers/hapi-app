'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var AppComponent = require('./home/home.jsx');


var App = React.createFactory(AppComponent);
var mountNode = document.getElementById('app-mount');
var serverState = window.state;


ReactDOM.render(App(serverState), mountNode);