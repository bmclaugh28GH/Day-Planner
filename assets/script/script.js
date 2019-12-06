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
// change the class of any hour, at start or hour change   
// **********************************************
function reclassifyHour (h, how) {

   var myCol = $(".timeAttr"+h).children(".textEntry");  
   myCol.removeClass ("currHour futureHour pastHour"); 
   switch(how){
      case 'past':
         myCol.addClass("pastHour"); 
         break;
      case 'future':
         myCol.addClass("futureHour");
         break;
      case 'current':
         myCol.addClass('currHour');
         break;
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

        var nextHour = new Date ().getHours(); 
        if (nextHour > currHour){
            reclassifyHour(currHour,'past'); 
            reclassifyHour(nextHour,'current'); 
        };

    }, 1000);
};  // startTimer


// **********************************************
// init 
// **********************************************
function init () {

   var today = new Date (); 
   currHour = today.getHours(); 
   console.log (today);    
   //hour = 10; //
   currDateElem.text ((parseInt (today.getMonth()) + 1) + '/' + today.getDate() + '/' + today.getFullYear()); 

   for (i=0; i<hourList.length;i++){
      if (hourList[i]<currHour){
         reclassifyHour(hourList[i], 'past'); 
      } 
      else if (hourList[i]>currHour){
         reclassifyHour(hourList[i], 'future'); 
      } 
      else if (hourList[i]=currHour){
         reclassifyHour(hourList[i], 'current'); 
      }
   }; 

   startTimer (); 

}; // init 

// **********************************************
// listeners
// **********************************************
$("#saveBtn").on("click", function () {
   alert ("hi"); 
}); 

// **********************************************
// main
// **********************************************

$(document).ready(function() {
   init ();
});

