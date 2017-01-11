var React = require('react');

// Require npm packages
var ReactBootstrap = require('react-bootstrap');
var Router = require('react-router');

// Require Stores
var LoaderStore = require('../../stores/LoaderStore.js');

var LoggedOut = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},  

	isLoggedIn: function(){
		var loggedIn = LoaderStore.isLoggedIn(); 

		// If session exists, but unverified.  Allow entry.  LoggedInLayout will verify from there
		if ( loggedIn==true ){
			this.smartRedirect(); 	
		} 	
	},

	componentWillMount: function(){
		this.isLoggedIn(); 
	},

	componentDidMount: function(){
		// do this whenever the order store emits a change
		LoaderStore.addChangeListener(this.isLoggedIn); 
	},

	componentWillUnmount: function(){
		LoaderStore.removeChangeListener(this.isLoggedIn); 
	},

	smartRedirect: function(){
		// use nextPathname if specified
		if ((this.props) && (this.props.location) && (this.props.location.state) && (this.props.location.state.nextPathname)){
			var nextPathname = this.props.location.state.nextPathname;
		} else {
			var nextPathname =  "/";
		}
		this.context.router.push(nextPathname);
	},

	render: function(){
	    return (
      		<div className="logged-out container-fluid">
		   		<h1>Logged Out</h1>
		   		{this.props.children}
			</div>
	    ); 
	}

});


module.exports = LoggedOut; 



