// Require React
var React = require('react'); 
var ReactDOM = require('react-dom'); 

// Require Stylesheets
require('../css/application.scss');

// Require React Router
var browserHistory = require('react-router').browserHistory;
var Router = require('react-router').Router;
var Route = require('react-router').Route;

// Require Sections
var App = require('./components/App.js'); 

var routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App}></Route>
  </Router>
); 

ReactDOM.render(routes, document.getElementById('app'));