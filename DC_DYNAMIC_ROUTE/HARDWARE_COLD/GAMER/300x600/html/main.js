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
var delayText = 0.2;


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
      console.log("loadSvgs - OV route");
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
  console.log(fbf.logDom(_root));
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

  nintendo.animateIntroLogoIn(-60,0,14);//use Nintendo's existing banners as a reference for these values
                                        //rightStart,rightFinish,LeftYoyo
	  TweenMax.delayedCall(2,scene2);
}

function scene2()
{

  //TIME TO PLAY
  log("scene 2 IN");
  fbf.show(mc_img_seq,mc_store_logo,mc_switch_logo,mc_mario_ribbon, mc_ribbon);

  nintendo.animateIntroLogoOut();

    //introduce logos
    TweenMax.from(mc_store_logo,0.8,{ delay:0.3, ease: Elastic.easeOut.config(1, 0.3), y:-45 });
    TweenMax.from(mc_switch_logo,0.8,{ delay:0.3, ease: Elastic.easeOut.config(1, 0.3), y:-45 });
    
    //first line of text
    TweenMax.from(mc_img_seq_txt_01,1.5,{ delay: 0.5, ease: Power4.easeOut, x:"-="+String(WID) });

    TweenMax.delayedCall(3,scene3);
}

function scene3()
{

  //PLAY AT HOME

	//scene OUT
  log("scene 3 IN");
    TweenMax.to(mc_img_seq_txt_01,1,{ ease: Back.easeInOut.config(1.7), x:"+="+String(WID) });
    TweenMax.to(mc_img_seq_01,1,{ ease: Power4.easeInOut, x:"+="+String(WID) });
  //scene IN
    TweenMax.from(mc_img_seq_02,1,{ ease: Power4.easeOut, x:"-="+String(WID) });
    TweenMax.from(mc_img_seq_txt_02,1.5,{ delay:0.2, ease: Expo.easeOut, x:-210 });
  
  TweenMax.delayedCall(2.5,scene4);
}

function scene4()
{

  //PLAY ON THE GO

    //scene OUT
  log("scene 4 IN");
    TweenMax.to(mc_img_seq_txt_02,1,{ ease: Back.easeInOut.config(1.7), x:"+="+String(WID) });
    TweenMax.to(mc_img_seq_02,1,{ ease: Power4.easeInOut, x:"+="+String(WID) });
  //scene IN
    TweenMax.from(mc_img_seq_03,1,{ delay:0, ease: Power4.easeOut, x:"-="+String(WID) });
    TweenMax.from(mc_img_seq_txt_03,1.5,{ delay:0.2, ease: Expo.easeOut, x:-237 });
  
  TweenMax.delayedCall(2.5,scene5);
}

function scene5()
{

  //PLAY WITH FRIENDS

    //scene OUT
  log("scene 5 IN");
    TweenMax.to(mc_img_seq_txt_03,1,{ ease: Back.easeInOut.config(1.7), x:"+="+String(WID) });
    TweenMax.to(mc_img_seq_03,1,{ ease: Power4.easeInOut, x:"+="+String(WID) });
  //scene IN
    TweenMax.from(mc_img_seq_04,1,{ delay:0, ease: Power4.easeInOut, x:"-="+String(WID) });
    TweenMax.from(mc_img_seq_txt_04,1.5,{ delay:0.2, ease: Expo.easeOut, x:-276 });
  
 TweenMax.delayedCall(2.5,scene6);
}

function scene6()
{
  fbf.show(mc_endscreen)
    //scene OUT
  log("scene 6 IN");
    TweenMax.to(mc_img_seq_txt_04,1,{ ease: Back.easeInOut.config(1.7), x:"+="+String(WID) });
    TweenMax.to(mc_img_seq_04,1,{ ease: Power4.easeInOut, x:"+="+String(WID) });
  //scene IN - RIBBON ALONG THE BOTTOM AND BUTTON
    //TweenMax.from(mc_mario_ribbon,0.7,{ delay:0.5, ease: Elastic.easeOut.config(1, 0.3), y:"+="+String(HEI*0.33) });
   //TweenMax.from(mc_ribbon,1,{ delay:0.6, ease: Elastic.easeOut.config(1, 0.3), y:"+="+String(HEI*0.11) });
    TweenMax.from(mc_DiscoverCTA,1,{delay:1.5, alpha:0});
  
    //TweenMax.delayedCall(3.5,scene7);
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
  var mc_endscreen = $('mc_endscreen');
    var mc_endscreen_img_02 = $('mc_endscreen_img_02');
    var mc_endscreen_img_01 = $('mc_endscreen_img_01');
    var mc_cta_box = $('mc_cta_box');
      var mc_DiscoverCTA = $('mc_DiscoverCTA');
        var cta_on = $('cta_on');
        var cta_off = $('cta_off');
  var mc_img_seq = $('mc_img_seq');
    var mc_img_seq_04 = $('mc_img_seq_04');
    var mc_img_seq_txt_04 = $('mc_img_seq_txt_04');
    var mc_img_seq_03 = $('mc_img_seq_03');
    var mc_img_seq_txt_03 = $('mc_img_seq_txt_03');
    var mc_img_seq_02 = $('mc_img_seq_02');
    var mc_img_seq_txt_02 = $('mc_img_seq_txt_02');
    var mc_img_seq_01 = $('mc_img_seq_01');
    var mc_img_seq_txt_01 = $('mc_img_seq_txt_01');
  var mc_store_logo = $('mc_store_logo');
  var mc_switch_logo = $('mc_switch_logo');
  var mc_whiteborder = $('mc_whiteborder');
  var mc_ribbon = $('mc_ribbon');
    var mc_gold_ribbon = $('mc_gold_ribbon');
    var mc_ribbon_txt = $('mc_ribbon_txt');
    var mc_ribbon_byob_txt = $('mc_ribbon_byob_txt');
  var mc_mario_ribbon = $('mc_mario_ribbon');
  var mc_switch_intro = $('mc_switch_intro');
    var mc_switch_intro_bg = $('mc_switch_intro_bg');
    var mc_switch_intro_left = $('mc_switch_intro_left');
    var mc_switch_intro_right = $('mc_switch_intro_right');
  var mc_keyline = $('mc_keyline');