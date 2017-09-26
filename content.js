//console.log(isEnvironmentSandbox());//Check if Environment is Production or Sandbox

//1. Calling the function to filters the Debug Summary List page in Salesforce.
if(window.location.pathname=='/setup/ui/listApexTraces.apexp' || window.location.pathname=='/one/one.app'){
	formatDebugSummaryLog();
}
else
//2. Calling the function to format the Debug Details page in Salesforce.
if(window.location.pathname=='/p/setup/layout/ApexDebugLogDetailEdit/d'){

	formatDebugDetailsLog();

	//getLogSummary();
}
else

//3. Calling the function to format the Class code where error has occured. BETA
if(window.location.href.indexOf('my.salesforce.com')>=0 
	&& window.location.href.indexOf('lineNo')>0
	&& window.location.href.indexOf('methodName')>0
){
			formatApexClass();
}



//formatApexClass();






 

 
