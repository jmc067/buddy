var Helper = {

  createURL: function(pathname,query){
    var url = pathname + "?"
    for (var key in query) {
      url = url + key + "=" + query[key] + "&"
    }
    return url.slice(0, -1);;  
  }

}

module.exports = Helper;
