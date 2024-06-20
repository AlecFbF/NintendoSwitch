//SETUP ------------------------------------------------------------------------------------------------------------
var local = window.location.protocol === "file:" || window.location.hostname == "localhost";
var ovlink = "oceanview.fivebyfivedigital.com";
var onOV = false;



var OVassetsToload = ["config.js","nintendo.js"];


var defaultClickURL = [
          {productLabel:"intro",productURL:"https://store.nintendo.co.uk/"} 
           ];

var usingSVGzip = true; // Manually set this if you are using svg.gzip

    var WID = 300;
    var HEI = 600;


var bgColour = "#ffffff";
var keylineColour = '#E70012';
var logging = false;
var chosenCTA;
var useDefaultClickThrough = true;
var nowOnEndscreen = false;
var config;
//var tiles = [];
var pinkGridWidth = $('mc_pink_tri_right').style.width.split("px")[0];
var blueGridWidth = $('mc_blue_tri_left').style.width.split("px")[0];




function setExits(){ //HAVE TO UPDATE THIS WITH CURRENT NAMING CONVENTION
  //initExits to get the doubleclick platform to recognise the exits, cannot be dynamically injected();
  Enabler.exit('default');  Enabler.exit('intro');  /*Enabler.exit('product1');  Enabler.exit('product2');  Enabler.exit('product3'); */
}

function areyouLocal()
{
  var isItLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";
  console.log(window.location.hostname.split(" ")[0]);
  if(window.location.hostname.split(" ")[0] == ovlink)
  {
    onOV = true;   console.log("ON OV");
  } else {
    onOV = false;  console.log("NOT ON OV");
  }
  return isItLocal; 
}
//START OF SEQUENCE OF ANIMATION -----------------------------------------------------------------------------------
function startBanner() //FLOW
{
  checkForIE();
  areyouLocal();
  loadScripts();
}

function loadScripts()
{
   console.log("loadScripts");
   if(onOV){
    loadJS(OVassetsToload,loadSvgs);
   } else {
     if(areyouLocal())
     {
       loadJS([getAsset('dir_assets/config.js'), getAsset('dir_global/nintendo.js')], loadSvgs);
     } else {
       loadJS([getAsset('dir_assets/config.js'), getAsset('dir_global/nintendo.js')], loadSvgs);
     }
   } 
}

function loadSvgs()
{
  if(usingSVGzip){
    if(onOV)
    {
      fbf.loadSvgs(defaultsetup); 
    }
    else
    {
       fbf.loadSvgs(defaultsetup,getAsset("dir_assets/svg.gz.js")); 
    }
   
  } else {
    defaultsetup();
  }
}

function defaultsetup() //FLOW
{
  fbf.clean(_root);
  fbf.replaceSVGDefs();

  _root.style.width = WID+"px";
  _root.style.height = HEI+"px";

  log("startBanner");
  checkForIE();
  nintendo.emergencyOverride();
  letsGo();
  _root.style.overflow='hidden';
}

function letsGo() //FLOW
{  
  log("letsGoooo");
  //nintendo.thisisgreat("HAHAHAHA");
  //sf.startUp("letsGo");
  log(fbf.logDom(_root));
  chosenCTA = mc_DiscoverCTA;//mc_shownowCTA;
  setListeners();
  hideAll();

  //if(generalBannerSetUp())introAnimation(); 
  fbf.show(mc_keyline, mc_lines);
  if(generalBannerSetUp()) showIntro();

}

var useMobile = fbf.isMobile();//true;

//_______________________________________________________________________________________________________________ fun stuff here


function showIntro()
{
    //INTRO SCENE - SWITCH LOGOS
    log("scene 1 IN");
  nintendo.animateIntroLogoIn(-60,0,14);//use Nintendo's existing banners as a reference for these values
                                        //rightStart,rightFinish,LeftYoyo


	TweenMax.delayedCall(2,endIntro);
}

function endIntro()
{


//fade Out intro
    nintendo.animateIntroLogoOut();


  fbf.show(mc_lines);


//start background animation
  nintendo.duplicateBackground(mc_lines,mc_lineTile,6); //divToDuplicate,tileDiv,howManyTiles
  nintendo.animateBackground(mc_lines,20,6); //divToAnimate,duration,howManyTiles
 TweenMax.delayedCall(0.2,scene1);
//animate in triangles
}



function scene1(){

 fbf.show(mc_lines,mc_blue_tri_left,mc_pink_tri_right,mc_blue_tri_right,mc_pink_tri_left,mc_scene_1,mc_switch_logo, mc_store_logo);

//move triangles off stage

TweenMax.set(mc_pink_tri_left,{x:"-="+String(pinkGridWidth)*0.7});
TweenMax.set(mc_blue_tri_right,{x:"+="+String(blueGridWidth)*0.7});
TweenMax.set(mc_pink_tri_right,{x:"+="+String(pinkGridWidth)*0.7});
TweenMax.set(mc_blue_tri_left,{x:"-="+String(blueGridWidth)*0.7});



//animate in triangles
FirstTrianglesIn(0);

//animate in character

 TweenMax.from(mc_char_1,0.8,{scale:0, alpha:0, ease: Expo.easeOut, delay:0});

//animate in text (x2)

 TweenMax.from(mc_title_1.children[0], 0.5, {ease: Expo.easeOut, x:"+=300", delay:0});
 TweenMax.from(mc_title_1.children[1], 0.5, {ease: Expo.easeOut, x:"+=300", delay:0.2});
 //TweenMax.from(mc_title_1.children[2], 0.5, {ease: Expo.easeOut, x:"+=200", delay:0.4});

 TweenMax.to(mc_title_1.children[0], 0.5, {alpha:0, delay:1.5});
 TweenMax.to(mc_title_1.children[1], 0.5, {alpha:0, delay:1.5});
 //TweenMax.to(mc_title_1.children[2], 0.5, {alpha:0, delay:1.5});


 TweenMax.from(mc_title_1.children[2], 0.5, {ease: Expo.easeOut, x:"+=300", delay:2.0});
 TweenMax.from(mc_title_1.children[3], 0.5, {ease: Expo.easeOut, x:"+=300", delay:2.2});
 //TweenMax.from(mc_title_1.children[5], 0.5, {ease: Expo.easeOut, x:"+=200", delay:2.4});

//pulse mario
 TweenMax.to(mc_char_1,0.2,{scale:1.15, ease: Sine.easeOut, delay:2.0});
 TweenMax.to(mc_char_1,0.3,{scale:1.03, ease: Sine.easeInOut, delay:2.3}); //--------------change scale to same as in .fla




 TweenMax.delayedCall(4, scene2);

}

function scene2(){

	fbf.show(mc_scene_2);
	//scene1 goes away
//riangles
FirstTrianglesOut(0);
SecondTrianglesIn(0.5);

//fadeout char
TweenMax.to(mc_char_1,0.5,{alpha:0});
//fade out copy
 TweenMax.to(mc_title_1.children[2], 0.5, {alpha:0, delay:0});
 TweenMax.to(mc_title_1.children[3], 0.5, {alpha:0, delay:0});
 //TweenMax.to(mc_title_1.children[5], 0.5, {alpha:0, delay:0});


//char2
 TweenMax.from(mc_char_2,0.8,{scale:0, alpha:0, ease: Expo.easeOut, delay:0.5});

 //text2
  TweenMax.from(mc_title_2.children[0], 0.5, {ease: Expo.easeOut,x:"-=300", delay:0.5});
 TweenMax.from(mc_title_2.children[1], 0.5, {ease: Expo.easeOut,x:"-=300", delay:0.7});
 TweenMax.delayedCall(2, scene3);

}


function scene3()
{
fbf.show(mc_scene_3);
SecondTrianglesOut(0);
FirstTrianglesIn(0.5);

//fadeout char
TweenMax.to(mc_char_2,0.5,{alpha:0});
//fade out copy
 TweenMax.to(mc_title_2.children[0], 0.5, {alpha:0, delay:0});
 TweenMax.to(mc_title_2.children[1], 0.5, {alpha:0, delay:0});

//char2
 TweenMax.from(mc_char_3,0.8,{scale:0, alpha:0, ease: Expo.easeOut, x:340, y:0, delay:0.5});

 //text2
  TweenMax.from(mc_title_3.children[0], 0.5, {ease: Expo.easeOut,x:"+=300", delay:0.5});
 TweenMax.from(mc_title_3.children[1], 0.5, {ease: Expo.easeOut,x:"+=300", delay:0.7});
  TweenMax.delayedCall(2, scene4);


}


function scene4()
{
fbf.show(mc_scene_4);
FirstTrianglesOut(0);
SecondTrianglesIn(0.5);

//fadeout char
TweenMax.to(mc_char_3,0.5,{alpha:0});
//fade out copy
 TweenMax.to(mc_title_3.children[0], 0.5, {alpha:0, delay:0});
 TweenMax.to(mc_title_3.children[1], 0.5, {alpha:0, delay:0});

//char2
 TweenMax.from(mc_char_4,0.8,{scale:0, alpha:0, ease: Expo.easeOut, x:480, y:530, delay:0.5});

 //text2
  TweenMax.from(mc_title_4.children[0], 0.5, {ease: Expo.easeOut,x:"-=300", delay:0.5});
 TweenMax.from(mc_title_4.children[1], 0.5, {ease: Expo.easeOut,x:"-=300", delay:0.7});
  TweenMax.delayedCall(2, endScreen);

}

function endScreen()
{
fbf.show(mc_endScreen);
SecondTrianglesOut(0);
FirstTrianglesIn(0.5);

//fadeout char
TweenMax.to(mc_char_4,0.5,{alpha:0});
//fade out copy
 TweenMax.to(mc_title_4.children[0], 0.5, {alpha:0, delay:0});
 TweenMax.to(mc_title_4.children[1], 0.5, {alpha:0, delay:0});

//char
 TweenMax.from(mc_char_end,0.8,{scale:0, alpha:0, ease: Expo.easeOut, x:242, y:760, delay:0.5});

 //text
  TweenMax.from(mc_endCopy.children[0], 0.5, {x:"+=300", ease:Expo.easeOut, delay:1});
 TweenMax.from(mc_endCopy.children[1], 0.5, {x:"+=300", ease:Expo.easeOut, delay:1.2});
  TweenMax.from(mc_endCopy.children[2], 0.5, {x:"+=300", ease:Expo.easeOut, delay:1.4});

  //logo
  TweenMax.from(mc_logo,0.5,{alpha:0, scale:0, ease: Back.easeOut, delay:0.7});

  //button
  TweenMax.from(mc_cta_box,0.5,{x:"+=300", ease:Expo.easeOut, alpha:0, delay:1.6});


}

function FirstTrianglesIn(del)
{
 log("FirstTrianglesIn");
 TweenMax.to(mc_pink_tri_right,0.4,{x:"-="+String(pinkGridWidth)*0.7, ease: Back.easeOut.config(1.2), delay:del});
 TweenMax.to(mc_blue_tri_left,0.4,{x:"+="+String(blueGridWidth)*0.7, ease: Back.easeOut.config(1.2),  delay:del});
}

function FirstTrianglesOut(del)
{
 log("FirstTrianglesOut");
 TweenMax.to(mc_pink_tri_right,0.4,{x:"+="+String(pinkGridWidth)*0.7, ease: Back.easeIn.config(1.2), delay:del});
 TweenMax.to(mc_blue_tri_left,0.4,{x:"-="+String(blueGridWidth)*0.7, ease: Back.easeIn.config(1.2), delay:del});
}

function SecondTrianglesIn(del)
{
 log("SecondTrianglesIn")
 TweenMax.to(mc_pink_tri_left,0.4,{x:"+="+String(pinkGridWidth)*0.7, ease: Back.easeOut.config(1.2), delay:del});
 TweenMax.to(mc_blue_tri_right,0.4,{x:"-="+String(blueGridWidth)*0.7, ease: Back.easeOut.config(1.2), delay:del});
}

function SecondTrianglesOut(del)
{
 log("SecondTrianglesOut")
 TweenMax.to(mc_pink_tri_left,0.4,{x:"-="+String(pinkGridWidth)*0.7, ease: Back.easeIn.config(1.2), delay:del});
 TweenMax.to(mc_blue_tri_right,0.4,{x:"+="+String(blueGridWidth)*0.7, ease: Back.easeIn.config(1.2), delay:del});	
}




//_______________________________________________________________________________________________________________ /fun




function hideAll()//UTIL
{
  log("hideAll")
  fbf.hide(_root.children);
}
function setListeners()//UTIL
{
    _root.addEventListener("click", handleClick);
    _root.addEventListener('mouseover', ad_rollOver, false);
    _root.addEventListener('mouseout', ad_rollOut, false);
 
}
ad_rollOver = function(e) {//UTIL
     fbf.hide( chosenCTA._('#cta_off')); 
     fbf.show( chosenCTA._('#cta_on'));    
}
ad_rollOut = function(e) {//UTIL
     fbf.hide( chosenCTA._('#cta_on')); 
     fbf.show( chosenCTA._('#cta_off'));
}

function btnClicked(event)//UTIL
{
  log("btnClicked"+event.target.id);
}

/////////////////////////////////////////////////////
var clickLabel;
var clickURL;
var clickType;

function handleClick(event) { //UTIL
  log("handleClick");
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
    var target = event.target || event.srcElement;
    var phase = event.eventPhase;

    if (useDefaultClickThrough) {
        log("useDefaultClickThrough");
       // if (nowOnEndscreen) {
            clickLabel = defaultClickURL[0]["productLabel"];
            clickURL = defaultClickURL[0]["productURL"];
       // } else {
        //    clickLabel = defaultClickURL[0]["productLabel"];
        //    clickURL = defaultClickURL[0]["productURL"];
       // }
    } else {

        clickLabel = products[prodCounter]["productLabel"];
        clickURL = products[prodCounter]["productURL"];
    }

    //if (useDynamicExit) clickURL = dynamicExit;
   // if(!onOV)
  //  {
      Enabler.exitOverride(clickLabel, clickURL);
  //  } else{
  //    console.log("SHOULD CLICK OUT TO: "+clickURL);
  //  }
    
   // if (useTracker) trackClick(event.clientX, event.clientY, clickLabel, clickURL);
}
/////////////////////////////////////////////////////

function blockmouseEvent(divtoblock){divtoblock.style.pointerEvents = "none";}
function giveCursor(divtocursor){divtocursor.style.cursor="pointer";}
function ignore(event){if(event!=null) event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;}
function checkForIE(){  var ua = window.navigator.userAgent; if (ua.indexOf('MSIE ')  >=  0 || ua.indexOf('Trident/') >= 0 || ua.indexOf('Edge/') >= 0) {
    _root.style.cssText +="-webkit-transform:rotateZ(0.00001deg);-moz-transform:rotateZ(0.00001deg);-ms-transform:rotateZ(0.00001deg);-o-transform:rotateZ(0.00001deg);transform:rotateZ(0.00001deg);";
  }}
function generalBannerSetUp(){  
  _root.style.display = "block";
  _root.style.backgroundColor = bgColour;
  addKeylineTo(mc_keyline, WID, HEI, keylineColour,'1');
  _root.style.cursor = "pointer";
  adready = true;
  return adready;
  killTweens.apply(null, _root.children);
}
function killTweens()
{
  var i;
    for (i = 0; i < arguments.length; i++) {
      TweenLite.killDelayedCallsTo(arguments[i]);
        TweenLite.killTweensOf(arguments[i]);
    }
}


//DOM
var _root = $('root');
	var mc_lines = $('mc_lines');
		var mc_lineTile = $('mc_lineTile');
	var mc_blue_tri_left = $('mc_blue_tri_left');
	var mc_blue_tri_right = $('mc_blue_tri_right');
	var mc_pink_tri_left = $('mc_pink_tri_left');
	var mc_pink_tri_right = $('mc_pink_tri_right');
	var mc_scene_1 = $('mc_scene_1');
		var mc_char_1 = $('mc_char_1');
		var mc_title_1 = $('mc_title_1');
	var mc_scene_2 = $('mc_scene_2');
		var mc_char_2 = $('mc_char_2');
		var mc_title_2 = $('mc_title_2');
	var mc_scene_3 = $('mc_scene_3');
		var mc_char_3 = $('mc_char_3');
		var mc_title_3 = $('mc_title_3');
	var mc_scene_4 = $('mc_scene_4');
		var mc_char_4 = $('mc_char_4');
		var mc_title_4 = $('mc_title_4');
	var mc_endScreen = $('mc_endScreen');
		var mc_char_end = $('mc_char_end');
		var mc_logo = $('mc_logo');
		var mc_endCopy = $('mc_endCopy');
		var mc_cta_box = $('mc_cta_box');
			var mc_DiscoverCTA = $('mc_DiscoverCTA');
				var cta_on = $('cta_on');
				var cta_off = $('cta_off');
	var mc_switch_logo = $('mc_switch_logo');
	var mc_store_logo = $('mc_store_logo');
	var mc_switch_intro_bg = $('mc_switch_intro_bg');
	var mc_switch_intro_left = $('mc_switch_intro_left');
	var mc_switch_intro_right = $('mc_switch_intro_right');
	var mc_keyline = $('mc_keyline');