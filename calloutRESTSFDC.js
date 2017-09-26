//Testing  JS Call
/* Get the cookie values om nom nom ----------------------*/
function getValueFromCookie(b) {
    var a, c, d, e = document.cookie.split(";");
	//console.log(e);
    for (a = 0; a < e.length; a++)
        if (c = e[a].substr(0, e[a].indexOf("=")), d = e[a].substr(e[a].indexOf("=") + 1), c = c.replace(/^\s+|\s+$/g, ""), c == b) return unescape(d)
}
 
/* Encapsulating code instead of just letting it lay about */
function getSFDCIdForTheComponent(componentName,lineNumber) {
    // Get an instance of the REST API client and set the session ID
	componentId='';
	
    var client = new forcetk.Client();
    client.setSessionToken(getValueFromCookie("sid"));
 
   
   
        // Find cases that belong to the current user
        client.query("SELECT Id FROM ApexClass WHERE Name = '"+componentName+"'", function(response){
            //console.log(response.records[0].Id);
			componentId = response.records[0].Id;
			
			window.open(window.location.origin+'/'+componentId+'?LineNo='+lineNumber.trim(), '_blank');
			formatApexClass();
        });
		
		return componentId;
    
}

function isEnvironmentSandbox(){
	orgType ='';
	
    // Get an instance of the REST API client and set the session ID
    var client = new forcetk.Client();
    client.setSessionToken(getValueFromCookie("sid"));
 
   
   
        // Find cases that belong to the current user
        client.query("select IsSandbox from Organization limit 1", function(response){
			orgType = response;
           // console.log(response);
        });
		
		return orgType;
    
}
