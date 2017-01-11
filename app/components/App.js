var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var LoaderAction = require('../../actions/LoaderAction.js');
var LoaderStore = require('../../stores/LoaderStore.js');
var Link = require('react-router').Link;
var Dispensaries = require('./Dispensaries.js');

var TopNav = React.createClass({
	getInitialState: function(){
		return {
			"logged_in":LoaderStore.isLoggedIn()
		}
	},
	updateState: function(){
		this.setState({"logged_in":LoaderStore.isLoggedIn()});
	},
	componentDidMount: function(){
		LoaderStore.addChangeListener(this.updateState); 
	},

	componentWillUnmount: function(){
		LoaderStore.removeChangeListener(this.updateState); 
	},
	render: function(){
		// replace with check for logged in
		var session_id = localStorage.getItem("session_id");
		if (this.state.logged_in){
			var login_or_logout = <p onClick={LoaderAction.logout}>Sign out</p>
		} else {
			var login_or_logout = <Link to="/login">Sign In</Link>
		}
		return (
			<div className="row">
		      	<div className="col-md-4"/>
			    <div className="col-md-6"/>
		      	<div className="col-md-2">
		      		{login_or_logout}	
		      	</div>
		    </div>
		);
	}
});

var App = React.createClass({
  render: function(){
    return (
      <div className="app container-fluid">
      	<TopNav/>
      	{this.props.children}
      </div>
    );
  }
});

module.exports = App;


