var React = require('react');
var LoaderAction = require('../../actions/LoaderAction.js');
var LoaderStore = require('../../stores/LoaderStore.js');

var Login = React.createClass({
  getInitialState: function(){
  	return {
  		"phone_number":"",
  		"password":""
  	}
  },
  changePhoneNumber: function(e){
  	var state = this.state;
  	state.phone_number = e.target.value;
  	this.setState(state);
  },
  changePassword: function(e){
  	var state = this.state;
  	state.password = e.target.value;
  	this.setState(state);
  },
  login: function(){
  	LoaderAction.login(this.state.phone_number,this.state.password);
  },
  render: function(){
    return (
      <div className="menu container-fluid">
		<div className="row">
	      	<div className="col-md-4"/>
	      	<div className="col-md-4">
  				<input type="text" className="form-control" placeholder="Phone Number" onChange={this.changePhoneNumber}/>
  				<br/>
  				<input type="text" className="form-control" placeholder="Pin" onChange={this.changePassword}/>
  				<br/>
				<button type="button" className="btn btn-default" onClick={this.login}>Sign In</button>	      	
			</div>
	      	<div className="col-md-4"/>
	    </div>
      </div>
    );
  }
});

module.exports = Login;


