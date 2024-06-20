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
  fbf.show(mc_keyline, mc_black);
  if(generalBannerSetUp()) showIntro();

}

var useMobile = fbf.isMobile();//true;

//_______________________________________________________________________________________________________________ fun stuff here


function showIntro()
{
    //INTRO SCENE - SWITCH LOGOS
  nintendo.animateIntroLogoIn(-60,0,14);//use Nintendo's existing banners as a reference for these values
                                        //rightStart,rightFinish,LeftYoyo

  TweenMax.delayedCall(2,endIntro);
}

function endIntro()
{
  //FADE OUT SWITCH LOGO INTRO SCREEN
  nintendo.animateIntroLogoOut();
  TweenMax.delayedCall(0.2,scene1);
}

function scene1()
{
  fbf.show(mc_logo,mc_scene_1, mc_switch_logo);
  TweenMax.from(mc_logo,0.5,{alpha:0, delay:0});
  TweenMax.from(mc_logo,0.5,{scale:0, ease: Back.easeOut.config(2),delay:0});


  TweenMax.from(mc_accolade,0.5,{alpha:0, delay:0.5});
  TweenMax.from(mc_accolade,0.5,{scale:0, transformOrigin:"50% 50%",ease: Back.easeOut.config(2), delay:0.5});

  TweenMax.to(mc_accolade,0.5,{alpha:0, delay:4.5});
  //TweenMax.to(mc_logo,0.5,{alpha:0, delay:4.5});

  TweenMax.delayedCall(4.5,scene2);
}

function scene2()
{
  fbf.show(mc_scene_2,mc_char_1,mc_ribbon);

  //move and scale logo to top left
  //TweenMax.set(mc_logo,{scale:0.25, x:114, y:34});

  //TweenMax.to(mc_logo,1,{alpha:1});
  TweenMax.from(mc_ribbon,1,{alpha:0});
  //TweenMax.from(mc_switch_logo,1,{alpha:0});
//moce scene and char off screen
  TweenMax.set(mc_scene_2,{x:"+="+String(WID)*1.7});
  TweenMax.set(mc_char_1,{x:"+="+String(WID)*1.7});

  //rainbowLineAnimation

   nintendo.duplicateBackground(mc_ribbon_line,mc_ribbon_line_tile,5); //divToDuplicate,tileDiv,howManyTiles
   nintendo.animateBackground(mc_ribbon_line,20,5); //divToAnimate,duration,howManyTiles


//animate on char and screen
  TweenMax.to(mc_scene_2,1,{x:"-="+String(WID)*1.7, ease: Power3.easeIn, delay:0});
  TweenMax.to(mc_char_1,1,{x:"-="+String(WID)*1.7, ease: Power3.easeIn, delay:0});
  TweenMax.to(mc_char_1,0.2,{x:"-="+String(WID)*1.2, ease:Power3.easeOut, delay:1});

//animate text
nintendo.textTypeAnimation(mc_title_1,0,0.06,20,1); //divToAnimate,LayerToStartFrom,gapBetweenLines,Xdistance,del

TweenMax.delayedCall(2.5,scene3);

}

function scene3()
{
  fbf.show(mc_scene_3,mc_char_2);


//moce scene and char off screen
  TweenMax.set(mc_scene_3,{x:"-="+String(WID)*1.7});
  TweenMax.set(mc_char_2,{x:"-="+String(WID)*1.7});



//animate on char and screen
  TweenMax.to(mc_scene_3,1,{x:"+="+String(WID)*1.7, ease: Power3.easeIn, delay:0});
  TweenMax.to(mc_char_2,1,{x:"+="+String(WID)*1.7, ease: Power3.easeIn, delay:0});
  TweenMax.to(mc_char_2,0.2,{x:"+="+String(WID)*1.2, ease:Power3.easeOut, delay:1});

//animate text
nintendo.textTypeAnimation(mc_title_2,0,0.04,20,1); //divToAnimate,LayerToStartFrom,gapBetweenLines,Xdistance,del

TweenMax.delayedCall(2.5,scene4);

}

function scene4()
{
  fbf.show(mc_scene_4,mc_char_3);


//moce scene and char off screen
  TweenMax.set(mc_scene_4,{x:"+="+String(WID)*1.8});
  TweenMax.set(mc_char_3,{x:"+="+String(WID)*1.8});



//animate on char and screen
  TweenMax.to(mc_scene_4,1,{x:"-="+String(WID)*1.8, ease: Power3.easeIn, delay:0});
  TweenMax.to(mc_char_3,1,{x:"-="+String(WID)*1.8, ease: Power3.easeIn, delay:0});
  TweenMax.to(mc_char_3,0.2,{x:"-="+String(WID)*1.3, ease:Power3.easeOut, delay:1});

//animate text
nintendo.textTypeAnimation(mc_title_3,0,0.03,20,1); //divToAnimate,LayerToStartFrom,gapBetweenLines,Xdistance,del

TweenMax.delayedCall(4.5,endScreen);

}


function endScreen()
{
  fbf.show(mc_endScreen);

  TweenMax.from(mc_bg_end,0.5,{alpha:0});
  TweenMax.from(mc_bg_end,1,{scale:3, ease: Expo.easeOut, transformOrigin:"40% 50%"});

  TweenMax.from(mc_cta_box,0.8,{scale:0, ease: Back.easeOut.config(5), delay: 1}); //transformOrigin:"50% 50%"
  TweenMax.from(mc_cta_box,0.5,{alpha:0, delay:1});
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
  var mc_black = $('mc_black');
  var mc_scene_1 = $('mc_scene_1');
    var mc_accolade = $('mc_accolade');
  var mc_scene_2 = $('mc_scene_2');
    var mc_bg_1 = $('mc_bg_1');
    var mc_title_1 = $('mc_title_1');
  var mc_scene_3 = $('mc_scene_3');
    var mc_bg_2 = $('mc_bg_2');
    var mc_title_2 = $('mc_title_2');
  var mc_scene_4 = $('mc_scene_4');
    var mc_bg_3 = $('mc_bg_3');
    var mc_title_3 = $('mc_title_3');
  var mc_endScreen = $('mc_endScreen');
    var mc_bg_end = $('mc_bg_end');
    var mc_cta_box = $('mc_cta_box');
      var mc_DiscoverCTA = $('mc_DiscoverCTA');
        var cta_on = $('cta_on');
        var cta_off = $('cta_off');
  var mc_logo = $('mc_logo');
  var mc_char_1 = $('mc_char_1');
  var mc_char_2 = $('mc_char_2');
  var mc_char_3 = $('mc_char_3');
  var mc_switch_logo = $('mc_switch_logo');
  var mc_ribbon = $('mc_ribbon');
    var mc_ribbonBG = $('mc_ribbonBG');
    var mc_ribbon_title = $('mc_ribbon_title');
    var mc_ribbon_line = $('mc_ribbon_line');
      var mc_ribbon_line_tile = $('mc_ribbon_line_tile');
    var mc_store_logo = $('mc_store_logo');
    var mc_ribbon_image = $('mc_ribbon_image');
  var mc_switch_intro_bg = $('mc_switch_intro_bg');
  var mc_switch_intro_left = $('mc_switch_intro_left');
  var mc_switch_intro_right = $('mc_switch_intro_right');
  var mc_keyline = $('mc_keyline');