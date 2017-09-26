function formatApexClass(){

	
var myCodeBlock = document.getElementsByClassName("codeBlock");
//myCodeBlock[0].setAttribute("style","background-color: rgb(48, 10, 36);color: white;");


var classCode = myCodeBlock[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1];

var arrayOfClassCode = classCode.innerText.split('\n');

var formatedCode='';
for(var i=0;i<arrayOfClassCode.length;i++){
	
	//console.log(arrayOfClassCode[i]);
	elementValue = '';
	
	//console.log(getQueryParams('lineNo'));
	lineNumber = parseInt(getQueryParams('lineNo').trim());

	
	if(arrayOfClassCode[i]==""){
		
		elementValue = " ";
	}else{
		
		elementValue = arrayOfClassCode[i];
	}
	
	
	if(i==(lineNumber-1) || elementValue.indexOf(getQueryParams('methodName').trim())>=0){
		formatedCode +='<div style="background-color: #ffe28c;font-size: 13px;font-weight: 700;color: rgb(113, 85, 4);">'+elementValue+'</div>';	
	}else{
		formatedCode +='<div>'+elementValue+'</div>';	
	}
	
}
classCode.innerHTML = formatedCode;

}


function getQueryParams( url ) {
	var value;
	var parameters = new Array();
	name = (window.location.href).substring((window.location.href).indexOf('?'),(window.location.href).length);
	
	if(name.indexOf('&')>0){
	   parameters = name.split('&');	
	}else{
		
		
		parameters.push(name);
	}
   
   for(i=0;i<parameters.length;i ++){
	   if(parameters[i].indexOf(url)>=0){
		  value =  parameters[i].split('=')[1];
	   }
	}
	
    return value;
}