var React = require('react');
var LoaderStore = require('../../stores/LoaderStore.js');

var DriverLayout = React.createClass({
  render: function(){
  	// Check driver permissions
  	var session = LoaderStore.getSession();
  	if (session.type=="driver"){
	    return (
	      <div className="driver-layout container-fluid">
	      	<h1>DriverLayout Layout</h1>
	      </div>
	    );
  	} else {
	    return (
	      <div className="driver-layout container-fluid">
	      	<h1>Unauthorized</h1>
	      </div>
	    );
  	}
  }
});

module.exports = DriverLayout;


