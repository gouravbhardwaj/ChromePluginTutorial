/*
@Author : Gourav Bhardwaj
@Description : This class holds the defination and utility methods to filter the components in the log body and attach relevant meta data like color, bgcolor
font-size and other styling to that elment.
*/


var FormatterClass = {

colorIndexTemplate : '<div id="colorIndex" style="background: #41404e;color: white;padding: 10px;top: 25%;bottom: 0;left: 93px;height: 154px;position: inherit;width: 222px;">',

globalStyle : {'Font_Weight':'900','Font_Size':'14px','Background_Color':'#41404e','Font_Color':'white'},

debugLevelToColorMapper : [
["FATAL_ERROR",{'Label':'Error','Text_Color':'rgb(161, 34, 34)','Background_Color':'rgb(242, 156, 156)'}],
["VARIABLE_ASSIGNMENT",{'Label':'Variable Assignment','Text_Color':'#0b0638','Background_Color':'#9185f1'}],
["CALLOUT_REQUEST",{'Label':'Callout','Text_Color':'#0c4040','Background_Color':'#85f1f1'}],
["VALIDATION_RULE",{'Label':'Validation Rule','Text_Color':'#38280C','Background_Color':'#ccc500'}],
["WORKFLOW",{'Label':'Workflow/Process Builder','Text_Color':'#35081d','Background_Color':'#fdc5df'}],
["CODE_UNIT_STARTED",{'Label':'Code Unit','Text_Color':'#38280c','Background_Color':'#FDF4C5'}],
["METHOD_ENTRY",{'Label':'Method Entry','Text_Color':'#0c350d','Background_Color':'#dff0d8'}],
["CUMULATIVE_LIMIT_USAGE",{'Label':'Cumulative Usage','Text_Color':'#31708f','Background_Color':'#d9edf7'}],
["USER_DEBUG",{'Label':'User Debug','Text_Color':'rgb(6, 6, 6)','Background_Color':'rgb(228, 228, 228)'}],
["DEFAULT",{'Label':'DEFAULT','Text_Color':'none','Background_Color':'none'}]
],

getColorForTheLevel : function(debugLevel){

var mapper = new Map(this.debugLevelToColorMapper);

return mapper.get(debugLevel);

},


getColorIndex : function(){

var indexSection = this.colorIndexTemplate;
this.debugLevelToColorMapper.forEach(function(data,index){

if(data[1].Label != 'DEFAULT'){
indexSection += '<div class="block"><div class="checkBos" ><input type="checkbox" name="colorIndex" value="'+data[1].Label+'"></div><div class="color" style="background-color:'+data[1].Background_Color
+';width: 13px;height: 13px;margin-right: 10px;"></div><div class="typeLog" style="font-size:14px;">'+data[1].Label+'</div></div>';
}

});

indexSection +='</div>';

return indexSection;

},
methodEntryCounter : 0,
codeUnitComponentId:' ',
getFormattedElement : function(element,debugLevel){
//	console.log('### : '+debugLevel);


if(debugLevel=='METHOD_ENTRY'){

formatter = this.getColorForTheLevel('METHOD_ENTRY');
formatted = '<div  style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'"><a class="methodEntryClass" id="methodEntry'+this.methodEntryCounter+'" href="//www.google.com" target="_blank">'+element+'</a></div>';

this.methodEntryCounter++;
}else if(debugLevel=='METHOD_EXIT'){
formatter = this.getColorForTheLevel('METHOD_ENTRY');
formatted = '<div  style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'"><a class="methodEntryClass" id="methodEntry'+this.methodEntryCounter+'" href="//www.google.com" target="_blank">'+element+'</a></div>';
}
else if(debugLevel=='CODE_UNIT_STARTED'){
isNumberNotstring = false;

if(this.codeUnitComponentId==' ' && element.indexOf(']|')>=0){
    componentId = element.substring(element.indexOf(']|')+2,element.indexOf(']|')+17);	

	if(!isNaN(componentId.substring(0,1))){
       isNumberNotstring = true;

        this.codeUnitComponentId = componentId;
	}
}

formatter = this.getColorForTheLevel(debugLevel);

formatted = '<div  style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'"><a class="codeUnitStartedClass" href="/'+this.codeUnitComponentId+'" target="_blank">'+element+'</a></div>';

}
else{
formatter = this.getColorForTheLevel(debugLevel);
formatted = '<div  style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'">'+element+'</div>';

}
//console.log('### : '+formatted);

return formatted;
},

};