var Dispatcher = require('../dispatcher/AppDispatcher.js');
var request = require('superagent');
var assign = require('object-assign'); 
var Router = require('react-router');
var EnvironmentConstants = require('../constants/EnvironmentConstants.js');
var LoaderConstants = require('../constants/LoaderConstants.js');

var _pendingRequests = {};

function abortPendingRequest(request_key) {
    if (_pendingRequests[request_key]) {
        _pendingRequests[request_key]._callback = function(){};
        _pendingRequests[request_key].abort();
        _pendingRequests[request_key] = null;
    }
}

function abortAllRequests(){
    Object.keys(_pendingRequests).map(function(request_key){
        abortPendingRequest(request_key);
    });
}

function isPending(request_key){
    // request is pending if the request_key is defined
    return (!(_pendingRequests[request_key]==undefined));
}

function requestUrl(path) {
    return EnvironmentConstants.API_URL + path;
}

function handleResponse(actionTypes,filters){
    var request_action = actionTypes["request_action"]; 
    var success_action = actionTypes["success_action"]; 
    var failure_action = actionTypes["failure_action"]; 
    return function(err,res){
        // If there is a response
        if (res) {
            // parse JSON
            switch(res.status) {
              case 200:      // Success
                Dispatcher.dispatch({
                    actionType: success_action,
                    response: successMessage(res,filters)
                });
                break;
              case 500:     // Internal Error
                console.log("500 error!");
                break; 
              case 403:     // Forbidden 
                console.log("403 error!  Forbidden!  Booting you...");
                Dispatcher.dispatch({
                    actionType: LoaderConstants.LOGOUT
                });
                break;
              default:      // 404,400,401
                console.log("Not 200 status!");
            }
        } else {   // An Error Occurred (no res returned)
            console.log(err);
        }         
        _pendingRequests[request_action] = null; 
    }
}

function successMessage(response,filters){
  var response = JSON.parse(response.text); 
  return assign({"success":true},response,filters); 
}

function failureMessage(response,filters){
  var response = JSON.parse(response.text); 
  return assign({"success":false},response,filters); 
}

function getRequest(url,query) {
    return request
        .get(url)
        .query(query)
}

function getFilters(query){
   var supportedFilters = [];
   var filters = {}; 
   for (var key in query){
        if (supportedFilters.includes(key)){
            filters[key] = query[key];
        }
   } 
   return filters; 
}

function triggerGetRequest(actionTypes,url,query){
    var request_action = actionTypes["request_action"];
    var success_action = actionTypes["success_action"];
    var failure_action = actionTypes["failure_action"];
    var filters = getFilters(query); 
    // If request is still pending, don't send another
    if (isPending(request_action)){
        return; 
    } else {
        _pendingRequests[request_action] = getRequest(url,query).end(
            handleResponse(actionTypes,filters)
        );
    }
}

function postRequest(url,query){
    return request
        .post(url)
        .query(query)
}

function triggerPostRequest(actionTypes,url,query){
    var request_action = actionTypes["request_action"];
    var success_action = actionTypes["success_action"];
    var failure_action = actionTypes["failure_action"];
    var filters = getFilters(query); 
    // If request is still pending, don't send another
    if (isPending(request_action)){
        return; 
    } else {
        _pendingRequests[request_action] = postRequest(url,query).end(
            handleResponse(actionTypes,filters)
        );
    }
}

var Api = {
    requestUrl: requestUrl,
    triggerGetRequest: triggerGetRequest,
    triggerPostRequest: triggerPostRequest,
    abortAllRequests: abortAllRequests 
};

module.exports = Api;




