var AppDispatcher = require('../dispatcher/AppDispatcher.js'); 
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign'); 
var LoaderConstants = require('../constants/LoaderConstants.js');

var CHANGE_EVENT = 'change'; 

var _dispensaries; 
var _menu = {}; 
var _session; 

var LoaderStore = assign({}, EventEmitter.prototype, {

	dispensariesLoaded: function() {
		if (_dispensaries==undefined) {
			return false; 	
		} else {
			return true; 
		}
	},

	getDispensaries: function(){
		return _dispensaries; 
	},

	setDispensaries: function(data){
		_dispensaries = data; 
	},

	clearDispensaries: function(){
		_dispensaries = undefined; 
	},

	menuLoaded: function(dispensary_id) {
		if (_menu[String(dispensary_id)]==undefined) {
			return false; 	
		} else {
			return true; 
		}
	},

	getMenu: function(dispensary_id){
		dispensary_id = String(dispensary_id);
		return _menu[dispensary_id]["menu_items"]; 
	},

	getItemPriceLog: function(dispensary_id){
		dispensary_id = String(dispensary_id);
		return _menu[dispensary_id]["item_price_log"]; 
	},

	setMenu: function(data){
		var dispensary_id = String(data.dispensary_id);
		var menu_items = data.menu_items;
		var item_price_log = data.item_price_log;
		_menu[dispensary_id] = {
			"menu_items": menu_items,
			"item_price_log": item_price_log
		}; 
	},

	clearMenu: function(){
		_menu = {}; 
	},

	login: function(data){
		console.log(data);
		localStorage.setItem("session_id", data["_id"]);        
		this.setSession(data);
	},

	logout: function(){
		this.clearSession();
	},

	isLoggedIn: function(){
		var session_id = localStorage.getItem("session_id"); 

		// If there is no access token, user is not logged in
		if (session_id==undefined){
			console.log("LoaderStore.isLoggedIn: FALSE");
			return false; 
		} else { 
			console.log("LoaderStore.isLoggedIn: TRUE");
			return true; 
		}
	},

	sessionLoaded: function() {
		console.log("checking loaded: ");
		console.log(_session);
		if (_session==undefined) {
			return false; 	
		} else {
			return true; 
		}
	},

	getSession: function(){
		return _session; 
	},

	setSession: function(data){
		console.log("setting session");
		_session = data; 
		console.log(_session);
	},

	clearSession: function(){
		localStorage.removeItem("session_id");
		_session = undefined; 
	},

	addToCart: function(cartItem){
		var cart = this.getCart();
		cart.push(cartItem);
		localStorage.setItem("cart", JSON.stringify(cart));        
		console.log(this.getCart());
	},

	removeFromCart: function(cartItem){

		var cart = this.getCart();

		// filter out cartItem
		var filteredCart = cart.filter(function(item){
			return item["code"]!=cartItem["code"];
		});
		
		localStorage.setItem("cart", JSON.stringify(filteredCart));        
		console.log(this.getCart());
	},

	getCart: function(){
		var cart = localStorage.getItem("cart");
		if (cart){
			cart = JSON.parse(cart);
		} else {
			cart = [];
			localStorage.setItem("cart", JSON.stringify(cart));        
		}
		return cart;
	},

	clearCart: function(){
		localStorage.removeItem("cart");
	},

	emitChange: function(){
		this.emit(CHANGE_EVENT); 
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback); 
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback); 	
	}

});

AppDispatcher.register(function(action){
    switch(action.actionType) {
      case LoaderConstants.LOAD_DISPENSARIES_COMPLETE:
		console.log("LoaderStore received LOAD_DISPENSARIES_COMPLETE");
		LoaderStore.setDispensaries(action.response); 
        LoaderStore.emitChange();
        break;

      case LoaderConstants.LOAD_MENU_COMPLETE:
		console.log("LoaderStore received LOAD_MENU_COMPLETE");
		LoaderStore.setMenu(action.response); 
        LoaderStore.emitChange();
        break;

      case LoaderConstants.LOGIN_SUCCESS:
		console.log("LoaderStore received LOGIN_SUCCESS");
		LoaderStore.login(action.response.session); 
        LoaderStore.emitChange();
        break;

      case LoaderConstants.LOGOUT:
		console.log("LoaderStore received LOGOUT");
		LoaderStore.logout(action.response); 
        LoaderStore.emitChange();
        break;

	  case LoaderConstants.LOAD_SESSION_SUCCESS:
		console.log("LoaderStore received LOAD_SESSION_SUCCESS");
		LoaderStore.login(action.response.session); 
        LoaderStore.emitChange();
        break;

	  case LoaderConstants.LOAD_SESSION_FAIL:
		console.log("LoaderStore received LOAD_SESSION_FAIL"); 
		LoaderStore.logout(); 
		LoaderStore.emitChange();
		break;

	  case LoaderConstants.UPDATE_MENU_ITEM_SUCCESS:
	  case LoaderConstants.CREATE_MENU_ITEM_SUCCESS:
		console.log("LoaderStore received ",action.actionType); 
		LoaderStore.clearMenu(); 
		LoaderStore.emitChange();
		break;

	  case LoaderConstants.ADD_TO_CART:
		console.log("LoaderStore received ADD_TO_CART"); 
		LoaderStore.addToCart(action.cartItem); 
		LoaderStore.emitChange();
		break;

	  case LoaderConstants.REMOVE_FROM_CART:
		console.log("LoaderStore received REMOVE_FROM_CART"); 
		LoaderStore.removeFromCart(action.cartItem); 
		LoaderStore.emitChange();
		break;


      default:
        break;
    };
});

module.exports = LoaderStore; 

