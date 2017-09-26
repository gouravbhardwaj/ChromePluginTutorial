//Global Variables

function formatDebugSummaryLog(){
//console.log('### Entering');

if(window.location.pathname=='/setup/ui/listApexTraces.apexp' || window.location.pathname=='/one/one.app'){
var firstHref = $("#Apex_Trace_List.traceForm.traceTable.thetracetable.tb");
//https://robots.thoughtbot.com/how-to-make-a-chrome-extension  background-color: rgb(223, 255, 235);


//var logTraceSection = document.getElementById('Apex_Trace_List:monitoredUsersForm').childNodes[3].childNodes[1].childNodes[1];

//console.log('### : '+logTraceSection.innerText);

var myElement = document.getElementById("Apex_Trace_List:traceForm:traceTable:thetracetable:tb");

if(myElement!=null){
for(var i = 0; i < myElement.rows.length; i++){
	
	
	var rowActions = document.getElementById('Apex_Trace_List:traceForm:traceTable:thetracetable:'+i+':rowActions');	
	
	rowActions.children[0].setAttribute("target", "_blank");
	rowActions.children[0].innerHTML = '<img width= "21px" title="View" src='+chrome.extension.getURL('/images/view2.png')+'>';
	rowActions.children[1].innerHTML = '<img width= "19px" title="Download" src='+chrome.extension.getURL('/images/download.png')+'>';
	rowActions.children[2].innerHTML = '<img width= "19px" title="Delete" src='+chrome.extension.getURL('/images/delete.png')+'>';
	
	
var statusColumn = document.getElementById('Apex_Trace_List:traceForm:traceTable:thetracetable:'+i+':status');
	if(statusColumn.innerHTML == 'Success'){
	 
	 statusColumn.parentElement.style.backgroundColor = "rgb(223, 255, 235)";
	 statusColumn.innerHTML = '<img title="'+statusColumn.innerHTML+'" src="'+chrome.extension.getURL('/images/success.png')+'" width="30px">';
	 
	 }else{
	 statusColumn.parentElement.style.backgroundColor = "rgb(255, 223, 223)";
	 statusColumn.innerHTML = '<img title="'+statusColumn.innerHTML+'" src="'+chrome.extension.getURL('/images/error.png')+'" width="30px">';
	 }
	 
	 
	 
}
}


}

}