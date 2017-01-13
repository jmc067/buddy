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
		var state = { showModal: false };
		var cartItem = LoaderStore.getCartItem(this.props.menu_item["code"]);

		// if item in cart, lets get the selection and quantity
		if (cartItem){
			state.selectedOption = cartItem["key"];
			state.quantity = cartItem["quantity"];
		} else {
			state.selectedOption = "";
			state.quantity = 0;
		}
		return state;
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
		var item_price_log = LoaderStore.getItemPriceLog(this.props.dispensary_id);
		if (this.state.selectedOption && this.state.quantity>0){
			var cartItem = {
				"name":cartItem["name"],
				"code":cartItem["code"],
				"dispensary_id":this.props.dispensary_id,
				"quantity":this.state.quantity,
				"nickname": item_price_log[this.state.selectedOption]["nickname"],
				"value": this.props.menu_item[this.state.selectedOption],
				"key": this.state.selectedOption
			}
			LoaderAction.addToCart(cartItem);
		}
		this.close();
	},
	remove_from_cart: function(cartItem){
		LoaderAction.removeFromCart(cartItem);
		this.close();
	},
	incrementQuantity: function(){
		var state = this.state;
		state.quantity += 1;
		this.setState(state);
	},
	decrementQuantity: function(){
		if ( this.state.quantity>0 ){
			var state = this.state;
			state.quantity -= 1;
			this.setState(state);
		}
	},
	updateSelection: function(priceOptionKey){
		var state = this.state;
		state.selectedOption = priceOptionKey;
		this.setState(state);
	},
	render: function(){
		var edit;
		if (this.props.session && this.props.session.type=="admin"){
			edit = (<EditItem dispensary_id={this.props.dispensary_id} menu_item={this.props.menu_item}/>);
		}
		var item_price_log = LoaderStore.getItemPriceLog(this.props.dispensary_id);
		var menu_item = this.props.menu_item;

		// find all price options
		var price_options = [];

		// for each option in menu_item
		for (var option in menu_item){
			// if it exists
			if (menu_item[option]) {
				// if ends in "price", then its a price option.  Let's include it
				if (option.slice(-5)=="price"){
					// add price option
					price_options.push({
						"nickname": item_price_log[option]["nickname"],
						"value": menu_item[option],
						"key": option
					});
				}
			} 		
		}

		// Populate price options component
		var item_selection = price_options.map(function(price_option,index){
			var price = "$" + price_option["value"] + " " +  price_option["nickname"];
			var btn_class = ""
			if (price_option["key"]==this.state.selectedOption){
				var btn_class = "btn btn-success";
			} 
			return (
		        <Button className={btn_class} key={index} onClick={this.updateSelection.bind(this,price_option["key"])}>
		          {price}
		        </Button>
			);
		}.bind(this));

		// determine cart options
		var add_to_cart_button;
		var edit_cart_button;
		var remove_from_cart_button;
		var cartItem = LoaderStore.getCartItem(menu_item["code"]);
		console.log(cartItem);
		// if in cart already
		if (cartItem){
			console.log(cartItem);
			console.log(this.state);
			// if EXACTLY the same as in the cart, give option to remove
			if (cartItem["quantity"]==this.state.quantity && cartItem["key"]==this.state.selectedOption){
				var remove_from_cart_button = (
		            <Button onClick={this.remove_from_cart.bind(this,menu_item)}>Remove From Cart</Button>
				);
			} else {
				var edit_cart_button = (
					<Button onClick={this.add_to_cart.bind(this,menu_item)}>Update Cart</Button>           	 
				);
			}
		} else {
			var add_to_cart_button = (
				<Button onClick={this.add_to_cart.bind(this,menu_item)}>Add To Cart</Button>           	 
			);
		}

		var cart_options = (
			<div>
				{add_to_cart_button}
				{edit_cart_button}
				{remove_from_cart_button}		
	        </div>
		);		

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
		            {item_selection}
			        <Button onClick={this.decrementQuantity}>
			          -
			        </Button>					
			        <p>Qty: {this.state.quantity}</p>
			        <Button onClick={this.incrementQuantity}>
			          +
			        </Button>					
		          </Modal.Body>
		          <Modal.Footer>
		          	{cart_options}
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


