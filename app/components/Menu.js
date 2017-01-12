var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var LoaderAction = require('../../actions/LoaderAction.js');
var LoaderStore = require('../../stores/LoaderStore.js'); 
var AdminButtons = require('./AdminButtons.js');
var AddItem = AdminButtons.AddItem;
var EditItem = AdminButtons.EditItem;


var MenuItem = React.createClass({
	getInitialState: function() {
		return { 
			showModal: false
		};
	},

	close: function() {
		var state = this.state;
		state.showModal = false;
		this.setState(state);
	},

	open: function() {
		var state = this.state;
		state.showModal = true;
		this.setState(state);
	},
	add_to_cart: function(cartItem){
		LoaderAction.addToCart(cartItem);
		// this.close();
	},
	remove_from_cart: function(cartItem){
		LoaderAction.removeFromCart(cartItem);
	},
	render: function(){
		var edit;
		if (this.props.session && this.props.session.type=="admin"){
			edit = (<EditItem dispensary_id={this.props.dispensary_id} menu_item={this.props.menu_item}/>);
		}
		var menu_item = this.props.menu_item;
		return (
			<div>
				<div onClick={this.open}>		
					<hr/>
					<h4>{menu_item["name"]}</h4>
					{edit}
					<hr/>
			    </div>

				<Modal show={this.state.showModal} onHide={this.close}>
		          <Modal.Header closeButton>
		            <Modal.Title>{menu_item["name"]}</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <h4>{menu_item["name"]}</h4>
		            <h4>{menu_item["category"]}</h4>
		            <p>{menu_item["description"]}</p>

		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.add_to_cart.bind(this,menu_item)}>Add To Cart</Button>
		            <Button onClick={this.remove_from_cart.bind(this,menu_item)}>Remove From Cart</Button>
		          </Modal.Footer>
		        </Modal>		    
			</div>
		);
	}
});

var MenuCategory = React.createClass({
	render: function(){
		var menu_items = this.props.menu_items.map(function(menu_item,index){
			return (<MenuItem key={index} dispensary_id={this.props.dispensary_id} menu_item={menu_item} session={this.props.session}/>);
		}.bind(this));
		return (
			<div>
				<h1>{this.props.category_name}</h1>
				{menu_items}	
			</div>
		);
	}
});

var MenuCategories = React.createClass({
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
	componentWillUpdate: function(){
    	LoaderAction.loadMenu(this.props.dispensary_id); 
    	LoaderAction.extendSession();
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
			// get items
			var items = LoaderStore.getMenu(this.props.dispensary_id);

			// convert to {category:[item,item]} format
			var formatted_menu = {};
			for (var index=0; index<items.length; index++){
				var item = items[index];
				if (formatted_menu[item["category"]]!=undefined){
					formatted_menu[item["category"]].push(item);
				} else {
					formatted_menu[item["category"]]=[];
					formatted_menu[item["category"]].push(item);
				}
			}

			// get full category list
			var category_list = [];
			for (var category_name in formatted_menu){
				category_list.push(category_name);
			}

			// create menu categories
			categories = category_list.map(function(category_name,index){
				var menu_items = formatted_menu[category_name];
				return (
					<MenuCategory key={index} dispensary_id={this.props.dispensary_id} category_name={category_name} menu_items={menu_items} session={this.props.session}/>
				)
			}.bind(this));
		} else {
		    var categories = (<h1>Grabbing menu...</h1>);
		}
		return (
			<div className="row">
		      	<div className="col-md-4"/>
		      	<div className="col-md-4">
		      		{categories}
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
	var add_menu_item;
	if (session && session.type=="admin"){
		add_menu_item = (<AddItem dispensary_id={dispensary_id}/>);
	}
    return (
      <div className="menu container-fluid">
      	<MenuCategories dispensary_id={dispensary_id} session={session}/>
      	{add_menu_item}
      </div>
    );
  }
});

module.exports = Menu;


