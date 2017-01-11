var React = require('react');

// Require Stores
var LoaderStore = require('../../stores/LoaderStore.js');

// Require Actions
var LoaderAction = require('../../actions/LoaderAction.js');


// Ensures user is verified 
var LoggedIn = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},  

	getInitialState: function(){
		return {
			"sessionLoaded":LoaderStore.sessionLoaded()
		}; 
	},

	updateState: function(){

		var isLoggedIn = LoaderStore.isLoggedIn(); 
		var sessionLoaded = LoaderStore.sessionLoaded();
		console.log("isLoggedIn: ", isLoggedIn);
		console.log("sessionLoaded: ", sessionLoaded);
		// Redirect to Login Page if user is not logged in
		if (isLoggedIn==false){
			this.context.router.push("login");
		} else {
			var state = {
				"sessionLoaded" : sessionLoaded
			};
			this.setState(state);
		} 
	},

	componentWillMount: function(){
    	LoaderAction.loadSession(); 
	},

	componentWillUpdate: function(){
    	LoaderAction.loadSession(); 
    	LoaderAction.extendSession();
	},

	componentDidMount: function(){
		LoaderStore.addChangeListener(this.updateState); 
	},

	componentWillUnmount: function(){
		LoaderStore.removeChangeListener(this.updateState); 
	},

	renderPendingLoggedIn: function(){
		return (<div>Loading...</div>); 
	},

	renderLoggedIn: function(){
		var location = this.props.location;
		return(
			<div className="LoggedInLayout">
				{this.props.children}
			</div>
		); 
	},

	render: function(){
		if ( this.state.sessionLoaded==true ){
			console.log("LoggedInLayout.renderLoggedIn");
	    	return this.renderLoggedIn(); 
		} else {
	    	console.log("LoggedInLayout.renderPendingLoggedIn");
	    	return this.renderPendingLoggedIn(); 
		}

	}

});


module.exports = LoggedIn; 



