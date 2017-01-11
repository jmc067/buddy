var React = require('react');
var LoaderStore = require('../../stores/LoaderStore.js');

var AdminLayout = React.createClass({
  render: function(){
  	// Check admin permissions
  	var session = LoaderStore.getSession();
  	if (session.type=="admin"){  		
	    return (
	      <div className="admin-layout container-fluid">
	      	<h1>AdminLayout Layout</h1>
	      	{this.props.children}
	      </div>
	    );
  	} else {
	    return (
	      <div className="admin-layout container-fluid">
	      	<h1>Unauthorized</h1>
	      </div>
	    );
  	}
  }
});

module.exports = AdminLayout;


