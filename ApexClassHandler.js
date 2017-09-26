/*
@Author : Gourav Bhardwaj
@Description : This class holds the defination and utility methods to collect namespace for ApexClasses, Structure of ApexClass( and Methods in future).
Methods to make a bulk remote call to retrive apex class ids and then assign the ids to relevant html elements.

Example <a href="/ApexClassId"> LinkedInClassName </a>  //This id is dynamically added to the element
*/

var ApexClassHandler = {

classNames :[],

//ClassName,  MetrhodName and Linenumber
classDetails:{},
classToIdMap:{},

methodEntryString :[],

//@Description : Collecting all the namespaces for the ORG.
retrieveNameSpaces : function(){
namesSpaces = new Array();

var client = new forcetk.Client();
client.setSessionToken(UtilClass.getCookieValue('sid'));
client.query('SELECT NamespacePrefix FROM ApexClass GROUP BY NamespacePrefix', function(data)
{

	//console.log(data);   

	for(var i=0;i<data.records.length;i++){
		//console.log(data.records[i].NamespacePrefix);  
		namesSpaces.push(data.records[i].NamespacePrefix);
		
	}


	
	//After getting all the names spaces call this method, it will get only the class names by removing ny namespaces and methods names.
	ApexClassHandler.getClassName(namesSpaces);

});

},


getClassName : function(namesSpaces){

if(this.methodEntryString){
for(var i=0;i<this.methodEntryString.length;i++){
var element = this.methodEntryString[i];
var lineNumber = element.substring(element.indexOf('|[')+2,element.indexOf(']|'));
var classStructure = element.substring(element.lastIndexOf('|')+1,element.length);
var nameSpaceUsed;
var className='';
var methodName='';

for(var j=0;j<namesSpaces.length;j++){
	if(classStructure.indexOf(namesSpaces[j])>=0){
	nameSpaceUsed = namesSpaces[j];
	}
}

//Check if namespace used for this element
if(nameSpaceUsed){
	className = classStructure.substring(classStructure.indexOf(nameSpaceUsed+'.')+(nameSpaceUsed+'.').length);

    methodName = className.substring(className.indexOf('.')+1,className.indexOf('()'));

	className = className.substring(0,className.indexOf('.'));


	
}else{
className = classStructure.substring(0,classStructure.indexOf('.'));
methodName = classStructure.substring(classStructure.indexOf('.')+1,classStructure.indexOf('()'));
}

this.addClassName(className,methodName,lineNumber);


}//First For Ends


//Make a call to retrieve the Ids of the class names retrivved above.
this.retriveApexClassIds();

}

},

addClassName : function(className,methodName,lineNumber){
	//console.log('### ClassNames : '+className);
	if(this.classNames.indexOf(className)<0){
		this.classNames.push(className);
		//this.classNames += ','+className;
	}

	//this.classDetails.push({name:className,methodName:methodName,lineNo:lineNumber});

    this.classDetails[methodName] = {className:className,lineNo:lineNumber};

	//console.log(this.classNames);
	//console.log(this.classDetails);
},



retriveApexClassIds : function(){
if(this.classNames && this.classDetails){
//console.log(this.classNames);

var client = new forcetk.Client();
client.setSessionToken(UtilClass.getCookieValue('sid'));


   
   if(this.classNames.length>0){
 	  // Find cases that belong to the current user
      client.query("SELECT Name,Id FROM ApexClass WHERE Name IN ('"+this.classNames.join('\',\'')+"')", function(response){
        	
        	//client.query("SELECT Name,Id FROM ApexClass WHERE Name IN ('LinkedInCrtl','LinkedInParser')", function(response){
           // console.log(response.records[0].Id);
			
            for(var i=0;i<response.records.length;i++){
			  	   className = response.records[i].Name;
					ApexClassHandler.classToIdMap[className] = response.records[i].Id;
				}

			ApexClassHandler.associateIdsToHTMLElement(response.records);

			  
			

        });
   }
}

},

associateIdsToHTMLElement : function(apexClassIds){
var hostUrl = UtilClass.getHostUrl();
var elements = document.getElementsByClassName('methodEntryClass');



	for(var j=0;j<elements.length;j++){


         for(var key1 in ApexClassHandler.classDetails){
             if(elements[j].innerText.indexOf(key1)>=0){
            
                  for(var key2 in ApexClassHandler.classToIdMap){
                      if(elements[j].innerText.indexOf(key2)>=0){
                      		elements[j].setAttribute("href","/"+ApexClassHandler.classToIdMap[key2]+'?lineNo='+ApexClassHandler.classDetails[key1].lineNo+'&methodName='+key1);
				   			break;

                      }

                  }

                   

             }

         }

	}
}

}
