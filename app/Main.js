// Require React
var React = require('react'); 
var ReactDOM = require('react-dom'); 

// Require Stylesheets
require('../css/application.scss');

// Require React Router
var browserHistory = require('react-router').browserHistory;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// Require Stores
var LoaderStore = require('../stores/LoaderStore.js');

// Require Services
var Helper = require('../services/Helpers.js');

// Require Sections
var App = require('./components/App.js'); 
var Dispensaries = require('./components/Dispensaries.js'); 
var Menu = require('./components/Menu.js'); 
var Login = require('./components/Login.js'); 
var LoggedIn = require('./components/LoggedIn.js'); 
var LoggedOut = require('./components/LoggedOut.js'); 
var AdminLayout = require('./components/AdminLayout.js'); 
var DriverLayout = require('./components/DriverLayout.js'); 



// Used to preserve attempted path while still enforcing login
function authenticatedRedirect(nextState, replace) {
  console.log('App.authenticatedRedirect');

  if (!LoaderStore.isLoggedIn()) {

    var nextURL = Helper.createURL(nextState.location.pathname,nextState.location.query);
    
    replace({
      pathname: 'login',
      state: { nextPathname: nextURL }
    })
  } 
}

var routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App}>
		<IndexRoute component={Dispensaries}/>
		<Route path="dispensary/:dispensary_id" component={Menu}/>

		<Route path="/" component={LoggedOut}>
	        <Route path="login" component={Login}/>
	    </Route>

		<Route path="/" component={LoggedIn} onEnter={authenticatedRedirect} >
			<Route path="admin" component={AdminLayout} >
				<Route path="menu" component={Menu}/>
			</Route>

			<Route path="driver" component={DriverLayout} >
			</Route>

		</Route>

    </Route>
  </Router>
); 

ReactDOM.render(routes, document.getElementById('app'));