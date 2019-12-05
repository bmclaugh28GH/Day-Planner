// **********************************************
// globals
// **********************************************

var interval;  
var currTimeElem = $("#currTime"); 
var currDateElem = $("#currDate"); 

var currHour = 0; 

// **********************************************
// functions
// **********************************************

// **********************************************
// change the class of any hour in the past  
// **********************************************
function reclassifyHour (h, how) {

   //console.log ("reclassifying hour " + h + " to " + how);
   var rowElemStr = '.row[timeAttr="' + h + '"]';
   //var rowElem = $('.row');
   var rowElem = $(rowElemStr);
   console.log (rowElem); 

   rowElem.removeClass ("currHour futureHour, pastHour"); 
   if (how=='past') {
      rowElem.addClass ("pastHour"); 
   }
   if (how=='future'){
      rowElem.addClass ("futureHour");
   }

} // reclassifyPastHour

// **********************************************
// render curr time 
// **********************************************
function renderCurrTime () {

   //console.log ("render"); 
   var today = new Date (); 
   var timeText = getTimeStr (today); 
   currTimeElem.text(timeText);
} // renderCurrTime

// **********************************************
// start timer 
// **********************************************
function startTimer () {

    clearInterval(interval); 
    interval = setInterval(function() {
        renderCurrTime();
    }, 1000);
} // startTimer


// **********************************************
// init 
// **********************************************
function init () {

   var today = new Date (); 
   hour = today.getHours(); 
   currDateElem.text (today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear()); 

   for (i=0; i<hourList.length;i++){
      if (hourList[i]<hour){
         reclassifyHour(i, 'past'); 
      } 
      else if (hourList[i]>hour){
         reclassifyHour(i, 'future'); 
      }
   }


   startTimer (); 

}; // init 

// **********************************************
// listeners
// **********************************************

// **********************************************
// main
// **********************************************

$(document).ready(function() {
   init ();
});

