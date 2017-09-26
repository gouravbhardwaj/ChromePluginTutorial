/*
@Author : Gourav Bhardwaj
@Description : 
*/

var UtilClass = {

 getCookieValue : function (cookieName) {
  var a, c, d, e = document.cookie.split(";");
  //console.log(e);
  for (a = 0; a < e.length; a++)
      if (c = e[a].substr(0, e[a].indexOf("=")), d = e[a].substr(e[a].indexOf("=") + 1), c = c.replace(/^\s+|\s+$/g, ""), c == cookieName) return unescape(d)
},

getHostUrl : function(){
return window.location.origin;

}


}