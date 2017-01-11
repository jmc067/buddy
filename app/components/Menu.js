var React = require('react');
var LoaderAction = require('../../actions/LoaderAction.js');
var LoaderStore = require('../../stores/LoaderStore.js');

var MenuItem = React.createClass({
	render: function(){
		var edit;
		if (this.props.session && this.props.session.type=="admin"){
			edit = (<div>Edit</div>);
		}
		return (
			<div>
				<hr/>
				<h1>{this.props.menu_item["name"]}</h1>
				{edit}
				<hr/>
			</div>
		);
	}
});


var Items = React.createClass({
	getInitialState: function(){
		return {
			"loaded":LoaderStore.menuLoaded(this.props.dispensary_id)
		}
	},
	updateState: function(){
		var loaded = LoaderStore.menuLoaded(this.props.dispensary_id);
		if (loaded != this.state.loaded){
			this.setState({"loaded":loaded});
		}
	},
	componentWillMount: function(){
		LoaderAction.loadMenu(this.props.dispensary_id);
	},
	componentDidMount: function(){
		LoaderStore.addChangeListener(this.updateState); 
	},

	componentWillUnmount: function(){
		LoaderStore.removeChangeListener(this.updateState); 
	},
	render: function(){
		if (this.state.loaded){
			var items = LoaderStore.getMenu(this.props.dispensary_id);
			items = items.map(function(menu_item,index){
				return (
					<MenuItem key={index} menu_item={menu_item} session={this.props.session}/>
				)
			}.bind(this));
		} else {
		    var items = (<h1>Grabbing menu</h1>);
		}
		return (
			<div className="row">
		      	<div className="col-md-4"/>
		      	<div className="col-md-4">
		      		{items}
		      	</div>
		      	<div className="col-md-4"/>
		    </div>
		);
	}
});

var Menu = React.createClass({
  render: function(){
  	var session = LoaderStore.getSession();
  	var dispensary_id = this.props.params.dispensary_id || session.dispensary_id;
    return (
      <div className="menu container-fluid">
      	<Items dispensary_id={dispensary_id} session={session}/>
      </div>
    );
  }
});

module.exports = Menu;


