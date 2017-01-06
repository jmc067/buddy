var AppDispatcher = require('../dispatcher/AppDispatcher.js'); 
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign'); 
var LoaderConstants = require('../constants/LoaderConstants.js');

var CHANGE_EVENT = 'change'; 

var _dispensaries; 

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
		console.log("LoaderStore received LOAD_METRICS_AGGREGATE_COMPLETE");
		LoaderStore.setDispensaries(action.response); 
        LoaderStore.emitChange();
        break;

      default:
        break;
    };
});

module.exports = LoaderStore; 

