var Api = require('../services/Api.js');
var Dispatcher = require('../dispatcher/AppDispatcher.js');
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
        var url = Api.requestUrl("/dispensary/search");
        var query = {};
        Api.triggerGetRequest(actionTypes,url,query);
    },

    loadDispensaries: function(){
        // If the store is not loaded for this query, load it!
        if (!LoaderStore.dispensariesLoaded()){
            this.getDispensaries(); 
        }
    },

    getMenu: function(dispensary_id) {
        var actionTypes = {
            "request_action" : LoaderConstants.LOAD_MENU_START,
            "success_action" : LoaderConstants.LOAD_MENU_COMPLETE,
            "failure_action" : LoaderConstants.LOAD_MENU_COMPLETE
        };
        var url_path = "/menu/" + dispensary_id;
        var url = Api.requestUrl(url_path);
        var query = {};
        Api.triggerGetRequest(actionTypes,url,query);
    },

    loadMenu: function(dispensary_id){
        // If the store is not loaded for this query, load it!
        if (!LoaderStore.menuLoaded(dispensary_id)){
            this.getMenu(dispensary_id); 
        }
    },

    getSession: function(){
        var actionTypes = {
            "request_action" : LoaderConstants.LOAD_SESSION_START,
            "success_action" : LoaderConstants.LOAD_SESSION_SUCCESS,
            "failure_action" : LoaderConstants.LOAD_SESSION_FAIL
        };
        var session_id = localStorage.getItem("session_id"); 
        var url = Api.requestUrl("/user/session/" + session_id);
        var query = {};
        Api.triggerGetRequest(actionTypes,url,query);
    },

    loadSession: function(){
        if (!LoaderStore.sessionLoaded()){
          this.getSession();
        }   
    },

    extendSession: function(){
        console.log("extending....");
    },

    login: function(phone_number,password){
        var actionTypes = {
            "request_action" : LoaderConstants.LOGIN_START,
            "success_action" : LoaderConstants.LOGIN_SUCCESS,
            "failure_action" : LoaderConstants.LOGIN_FAIL
        };
        var url_path = "/user/login";
        var url = Api.requestUrl(url_path);
        var query = {
            "phone_number":phone_number,
            "password":password
        };
        Api.triggerPostRequest(actionTypes,url,query);
    },

    logout: function(){
        Dispatcher.dispatch({
            actionType: LoaderConstants.LOGOUT
        });
    }

}

module.exports = LoaderAction; 



