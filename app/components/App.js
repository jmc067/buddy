var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var LoaderAction = require('../../actions/LoaderAction.js');
var LoaderStore = require('../../stores/LoaderStore.js');
var Link = require('react-router').Link;

var Carousel = React.createClass({
	render: function(){
		return (
			<div className="row">
		      	<div className="col-md-4"/>
			        <h1 className="col-md-4">Buddy</h1>
		      	<div className="col-md-4"/>
		    </div>
		);
	}
});

var Dispensary = React.createClass({
	render: function(){
		var style = {
			backgroundImage: 'url(' + this.props.dispensary["image"] + ')',
		};				
		var link = "/menu/" + this.props.dispensary["_id"];
		return (
			<Link to={link}>
				<h1>{this.props.dispensary["name"]}</h1>
			</Link>
		);
	}
});

var Dispensaries = React.createClass({
	getInitialState: function(){
		return {
			"loaded":LoaderStore.dispensariesLoaded()
		}
	},
	updateState: function(){
		var loaded = LoaderStore.dispensariesLoaded();
		if (loaded != this.state.loaded){
			this.setState({"loaded":loaded});
		}
	},
	componentWillMount: function(){
		LoaderAction.loadDispensaries();
	},
	componentDidMount: function(){
		LoaderStore.addChangeListener(this.updateState); 
	},

	componentWillUnmount: function(){
		LoaderStore.removeChangeListener(this.updateState); 
	},
	render: function(){
		if (this.state.loaded){
			var dispensaries = LoaderStore.getDispensaries();
			dispensaries = dispensaries["dispensaries"].map(function(dispensary,index){
				return (
					<Dispensary key={index} dispensary={dispensary}/>
				)
			});
		} else {
		    var dispensaries = (<h1>Finding local buddies</h1>);
		}
		return (
			<div className="row">
		      	<div className="col-md-4"/>
		      	<div className="col-md-4">
		      		{dispensaries}
		      	</div>
		      	<div className="col-md-4"/>
		    </div>
		);
	}
});

var App = React.createClass({
  render: function(){
    return (
      <div className="app container-fluid">
      	<Carousel/>
      	<Dispensaries/>
      </div>
    );
  }
});

module.exports = App;


