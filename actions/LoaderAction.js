var Api = require('../services/Api.js');
var assign = require('object-assign'); 
var LoaderConstants = require('../constants/LoaderConstants.js');
var LoaderStore = require('../stores/LoaderStore.js');

var LoaderAction =  {
    getDispensaries: function() {
        var actionTypes = {
            "request_action" : LoaderConstants.LOAD_DISPENSARIES_START,
            "success_action" : LoaderConstants.LOAD_DISPENSARIES_COMPLETE,
            "failure_action" : LoaderConstants.LOAD_DISPENSARIES_COMPLETE
        };
        var url = Api.requestUrl("/search/dispensary");
        var query = {};
        Api.triggerGetRequest(actionTypes,url,query);
    },

    loadDispensaries: function(){
        // If the store is not loaded for this query, load it!
        if (!LoaderStore.dispensariesLoaded()){
            this.getDispensaries(); 
        }
    }

}

module.exports = LoaderAction; 



