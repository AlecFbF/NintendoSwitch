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
var slideDelay = 2.5;
var bgColour = "#ffffff";
var keylineColour = '#E70012';
var logging = false;
var chosenCTA;
var useDefaultClickThrough = true;
var nowOnEndscreen = false;
var config;

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
  fbf.show(mc_keyline,mc_whiteborder);
  if(generalBannerSetUp()) scene1();

}

var useMobile = fbf.isMobile();//true;


//_______________________________________________________________________________________________________________ fun stuff here


function scene1()
{
    //INTRO SCENE - SWITCH LOGOS
    log("scene 1 IN");
  nintendo.animateIntroLogoIn(-60,0,14);//use Nintendo's existing banners as a reference for these values -60,0,14
                                        //rightStart,rightFinish,LeftYoyo




	TweenMax.delayedCall(2,scene2);
}

function scene2()
{

  //TIME TO PLAY
  log("scene 2 IN");
  fbf.show(mc_whiteborder,mc_window_1,mc_window_2,mc_window_3);

  nintendo.animateIntroLogoOut();




    //Window 1
    TweenMax.set(mc_window_1,{x:"+=284"});

    TweenMax.to(mc_window_1,1,{x:"-=284", delay:slideDelay*0 , ease: Expo.easeOut}); //1
    TweenMax.delayedCall(slideDelay*0,nintendo.textTypeAnimation, [mc_window_1_f1,1,0.05,20,0.3]); //divToAnimate,layerToStartFrom,gapBetweenLetters,Ydistance,del


    TweenMax.to(mc_window_1,1,{x:"-=284", delay:slideDelay*1 , ease: Expo.easeInOut}); //2

    TweenMax.to(mc_window_1,1,{x:"-=284", delay:slideDelay*2 , ease: Expo.easeInOut});  //3

    TweenMax.to(mc_window_1,1,{x:"-=284", delay:slideDelay*3 , ease: Expo.easeInOut});  //4
    TweenMax.delayedCall(slideDelay*3,nintendo.textSlideAnimation, [mc_window_1_f4,1, 0.2,100,0.5]); //divToAnimate,LayerToStartFrom,gapBetweenLines,Xdistance,del


    TweenMax.to(mc_window_1,1,{x:"-=284", delay:slideDelay*5 , ease: Expo.easeInOut});  //5




    //Window 2
    TweenMax.set(mc_window_2,{x:"-=284"});

    TweenMax.to(mc_window_2,1,{x:"+=284", delay:slideDelay*0+0.2      , ease: Expo.easeOut});  //1
    //TweenMax.delayedCall(slideDelay*0,nintendo.textTypeAnimation, [mc_window_2_f1,1,0.05,20,0.3]); //divToAnimate,layerToStartFrom,gapBetweenLetters,Ydistance,del

    TweenMax.to(mc_window_2,1,{x:"+=284", delay:slideDelay*1+0.2     , ease: Expo.easeInOut});  //2
    TweenMax.delayedCall(slideDelay*1,nintendo.textTypeAnimation, [mc_window_2_f2,1, 0.05,20,0.7]); //divToAnimate,layerToStartFrom,gapBetweenLetters,Ydistance,del


    TweenMax.to(mc_window_2,1,{x:"+=284", delay:slideDelay*2+0.2      , ease: Expo.easeInOut}); //3
    //TweenMax.delayedCall(slideDelay*2,nintendo.textTypeAnimation, [mc_window_2_f3,1,0.05,20,0.7]); //divToAnimate,layerToStartFrom,gapBetweenLetters,Ydistance,del

    TweenMax.to(mc_window_2,1,{x:"+=284", delay:slideDelay*3+0.2      , ease: Expo.easeInOut}); //4

    TweenMax.to(mc_window_2,1,{x:"+=284", delay:slideDelay*5+0.2      , ease: Expo.easeInOut}); //5




    //Window 3
    TweenMax.set(mc_window_3,{x:"+=284"});
    TweenMax.to(mc_window_3,1,{x:"-=284", delay:slideDelay*0 + 0.4, ease: Expo.easeOut}); //1

    TweenMax.to(mc_window_3,1,{x:"-=284", delay:slideDelay*1 +0.4     , ease: Expo.easeInOut}); //2
    //TweenMax.delayedCall(slideDelay*1,nintendo.textTypeAnimation, [mc_window_3_f2,1, 0.05,20,0.7]); //divToAnimate,layerToStartFrom,gapBetweenLetters,Ydistance,del


    TweenMax.to(mc_window_3,1,{x:"-=284", delay:slideDelay*2 +0.4     , ease: Expo.easeInOut}); //3
    TweenMax.delayedCall(slideDelay*2+0.2,nintendo.textTypeAnimation, [mc_window_3_f3,1,0.05,20,0.7]); //divToAnimate,layerToStartFrom,gapBetweenLetters,Ydistance,del


    TweenMax.to(mc_window_3,1,{x:"-=284", delay:slideDelay*3 +0.4     , ease: Expo.easeInOut}); //4

    TweenMax.to(mc_window_3,1,{x:"-=284", delay:slideDelay*5 +0.4   , ease: Expo.easeInOut});  //5


  
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
	var mc_white = $('mc_white');
	var mc_window_3 = $('mc_window_3');
		var mc_window_3_f1 = $('mc_window_3_f1');
		var mc_window_3_f2 = $('mc_window_3_f2');
		var mc_window_3_f3 = $('mc_window_3_f3');
		var mc_window_3_f4 = $('mc_window_3_f4');
		var mc_window_3_f5 = $('mc_window_3_f5');
	var mc_window_2 = $('mc_window_2');
		var mc_window_2_f5 = $('mc_window_2_f5');
			var mc_cta_box = $('mc_cta_box');
				var mc_DiscoverCTA = $('mc_DiscoverCTA');
					var cta_on = $('cta_on');
					var cta_off = $('cta_off');
		var mc_window_2_f4 = $('mc_window_2_f4');
		var mc_window_2_f3 = $('mc_window_2_f3');
		var mc_window_2_f2 = $('mc_window_2_f2');
		var mc_window_2_f1 = $('mc_window_2_f1');
	var mc_window_1 = $('mc_window_1');
		var mc_window_1_f1 = $('mc_window_1_f1');
		var mc_window_1_f2 = $('mc_window_1_f2');
		var mc_window_1_f3 = $('mc_window_1_f3');
		var mc_window_1_f4 = $('mc_window_1_f4');
		var mc_window_1_f5 = $('mc_window_1_f5');
	var mc_whiteborder = $('mc_whiteborder');
	var mc_switch_intro_bg = $('mc_switch_intro_bg');
	var mc_switch_intro_left = $('mc_switch_intro_left');
	var mc_switch_intro_right = $('mc_switch_intro_right');
	var mc_keyline = $('mc_keyline');