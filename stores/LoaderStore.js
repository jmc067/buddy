var AppDispatcher = require('../dispatcher/AppDispatcher.js'); 
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign'); 
var LoaderConstants = require('../constants/LoaderConstants.js');

var CHANGE_EVENT = 'change'; 

var _dispensaries; 
var _menu = {}; 

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
		return _menu[dispensary_id]; 
	},

	setMenu: function(data){
		var dispensary_id = String(data.dispensary_id);
		var menu_items = data.menu_items;
		_menu[dispensary_id] = menu_items; 
	},

	clearMenu: function(){
		_menu = {}; 
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

      default:
        break;
    };
});

module.exports = LoaderStore; 

