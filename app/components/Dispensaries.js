var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var LoaderAction = require('../../actions/LoaderAction.js');
var LoaderStore = require('../../stores/LoaderStore.js');
var Link = require('react-router').Link;

var Dispensary = React.createClass({
	render: function(){
		var style = {
			backgroundImage: 'url(' + this.props.dispensary["image"] + ')',
		};				
		var link = "/dispensary/" + this.props.dispensary["_id"];
		return (
			<Link to={link}>
				<hr/>
				<h1>{this.props.dispensary["name"]}</h1>
				<hr/>
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

module.exports = Dispensaries;
