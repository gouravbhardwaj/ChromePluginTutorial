$(document).ready(function(){
var currentIndex = 0;

 
var autoSlide = setInterval(function() {

var itemAmt = $('.container .sliderItem').length;

  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 7000);


$('.next').click(function() {
  clearInterval(autoSlide);
  
  var itemAmt = $('.container .sliderItem').length;
  
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.prev').click(function() {
  clearInterval(autoSlide);
  
  var itemAmt = $('.container .sliderItem').length;
  
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = itemAmt - 1;
  }
  cycleItems();
  
});


function cycleItems() {
  var item = $('.container .sliderItem').eq(currentIndex);
   var items = $('.container .sliderItem');
   items.hide();
  //items.fadeOut("slow").item.fadeIn('slow');
  
  item.css('display','inline-block');
  
  $('#footerId').html('Step '+(currentIndex+1)+' of '+items.length);
}

//Class LogHelpPopup
LogHelpDataClass = {
keyValuePair : {0:'first',1:'second',2:'third',3:'fourth'},
getLength :function(){
return this.heading.length;
},
heading : ['Debug Log','Log Summary','Color Index','Log Suggestion'],
description : [
'From the Setup go to the Quick Find in the left, enter Debug Logs and select Debug Logs. The Debug Log in the Salesforce is transformed and highlighted as per the status of the Log, i.e Red for error and Green for Success making it easily distinguishable.',
'The sections of the log details is highlighted in different colors, each color Identifies a different flow of execution of the log.',
'The color index makes it easier to identify the color which signifies the flow  in the Log.',
'The log details has a section indexing the color and the respective flow its tracking, making it easier to track the log.'
],
bannerPic :['Log/logList.png','Log/LogDetail.png','Log/logIndex.png','Log/logHelp.png']
};
decorateUI();
});


function decorateUI()
{
var innerblog ='';

for (i = 0; i < LogHelpDataClass.getLength(); i++) 
{ 

innerblog +='<div class="sliderItem" style="'+ ((i == 0) ? 'display: inline-block;' : '')+'">'+
 ' <div>'+
	'<div>'+
	  '<h1>'+LogHelpDataClass.heading[i]+'</h1>'+
	  '<p class="description">'+LogHelpDataClass.description[i]+'</p>'+
	  '<p> <img class="sliderImage" src="'+LogHelpDataClass.bannerPic[i]+'"></p>'+
	'</div>'+
  '</div>'+
'</div>'; 
}
$('#rollblock').html(innerblog);

}