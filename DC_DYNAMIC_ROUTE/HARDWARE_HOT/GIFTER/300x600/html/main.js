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
  Enabler.exit('default');  Enabler.exit('intro');  Enabler.exit('product1');  Enabler.exit('product2');  Enabler.exit('product3');  Enabler.exit('product4');  Enabler.exit('product5');
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
  console.log(fbf.logDom(_root));
  chosenCTA = mc_DiscoverCTA;//mc_shownowCTA;
  setListeners();
  hideAll();

  //if(generalBannerSetUp())introAnimation(); 
  fbf.show(mc_keyline);
  if(generalBannerSetUp()) scene1();

}

var useMobile = fbf.isMobile();//true;



//_______________________________________________________________________________________________________________ fun stuff here


function scene1()
{
    //INTRO SCENE - SWITCH LOGOS
  log("scene 1 IN");
  fbf.show(mc_red);
  nintendo.animateIntroLogoIn(-60,0,14);//use Nintendo's existing banners as a reference for these values
                                        //rightStart,rightFinish,LeftYoyo
	TweenMax.delayedCall(2,scene2);
}

function scene2()
{
	log("scene 2 IN");

    nintendo.animateIntroLogoOut();

	 fbf.show(mc_introtxt);

	 //SMALL LOGOS FOR INTRO
	 TweenMax.from(mc_switchlogo_intro2,1,{ delay:0.7, alpha:0 });
	 TweenMax.from(mc_store_logo_introtxt,1,{ delay:0.7, alpha:0 });
 
   TweenMax.from(mc_introtxt_01,0.2,{ delay:1, alpha:0 });
	 TweenMax.from(mc_introtxt_01,0.5,{ delay:1, ease: Bounce.easeOut, scale: 0.2});

	 //TXT 1 OUT AND TXT 2 IN
	 TweenMax.to(mc_introtxt_01,0.8,{ delay:3 , ease: Back.easeIn, alpha:0, scale: 0.1, onComplete:fbf.displayNone,onCompleteParams:[mc_introtxt_01] });

   TweenMax.from(mc_introtxt_02,0.2,{ delay:4, alpha:0 });
	 TweenMax.from(mc_introtxt_02,0.5,{ delay:4, ease: Bounce.easeOut, scale: 0.2});


	 //TXT 2 OUT AND TXT 3 IN

	 TweenMax.to(mc_introtxt_02,0.8,{ delay:6 , ease: Back.easeIn, alpha:0, scale: 0.1, onComplete:fbf.displayNone,onCompleteParams:[mc_introtxt_02] });
   
   TweenMax.from(mc_introtxt_03,0.2,{ delay:7, alpha:0 });
   TweenMax.from(mc_introtxt_03,0.5,{ delay:7, ease: Bounce.easeOut, scale: 0.2});

	 //TXT 3 OUT
	 TweenMax.to(mc_introtxt_03,0.8,{ delay:9 , ease: Back.easeIn, alpha:0, scale: 0.1, onComplete:fbf.displayNone,onCompleteParams:[mc_introtxt_03] });

	 TweenMax.delayedCall(10,scene3);
}
function scene3()
{
	log("scene 3 IN");
fbf.show(mc_product_seq,mc_bg,mc_store_logo,mc_mario_ribbon,mc_ribbon,mc_header_txt)
		
		// GOODBYE RED INTRO
		TweenMax.to(mc_red,1,{ alpha:0, onComplete:fbf.displayNone,onCompleteParams:[mc_red] });
		TweenMax.to(mc_introtxt,1,{ alpha:0, onComplete:fbf.displayNone,onCompleteParams:[mc_introtxt] });

		//TweenMax.from(mc_header_txt,1,{ delay:1, alpha:0 });

		//fbf.hide(mc_product_seq_01, mc_product_seq_02)
		mc_product_btn_left.__("path")[2].addEventListener("click", onLeftClicked);
		mc_product_btn_right.__("path")[2].addEventListener("click", onRightClicked);

var products = mc_product_container.children;

	TweenMax.set(products[1], {alpha:0, x:-100, y:0, scale:0.75});
	TweenMax.set(products[2], {alpha:0, x:100, y:0, scale:0.75});

	carousel(0, 0);
	useDefaultClickThrough = false;
	TweenMax.delayedCall(0,scene4);
}
function onLeftClicked(event)
{
	if(event) event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;  
	console.log("left");
	carousel(1, 0.25);
}
function onRightClicked(event)
{
	if(event) event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;  
	console.log("right");
	carousel(-1, 0.25);
}
var carouselIndex = 0;
function carousel(direction, time)
{
	var products = mc_product_container.children;

	carouselIndex += direction;
	if(carouselIndex < 0) carouselIndex = products.length-1;
	else carouselIndex %= products.length;

	var base = carouselIndex/products.length;
	for (var i = 0; i < products.length; i++) {
		setProductFromAngle(products[i], base + (i/products.length), time);
	}
	setupHandleClick(carouselIndex);
	//console.log(carouselIndex);
}
function setProductFromAngle(product, angle, time)
{
	var x = Math.sin(angle * Math.PI * 2);
	var y = Math.cos(angle * Math.PI * 2);
	//these are in the -1 -> 1 range
	var radius = 170; //200
	var alpha = y + 1;
	alpha /= 2;
	var scale = y + 1;
	scale /= 2;
	scale /= 2;
	scale += 0.5;
	TweenMax.to(product, time, {alpha:alpha, x:x * radius, y:0, scale:scale});

 
}

function setupHandleClick(productNumForUrl)
{
	console.log("setupHandleClick");
	console.log(productNumForUrl);
	prodCounter = productNumForUrl;

}

function scene4()
{
	log("scene 4 IN");
	fbf.show(mc_mario_ribbon,mc_ribbon)
	//fbf.hide(mc_gold_ribbon_txt02,mc_gold_ribbon_txt03)
  //scene IN - RIBBON ALONG THE BOTTOM
    TweenMax.from(mc_mario_ribbon,0.7,{ delay:0.5, ease: Elastic.easeOut.config(1, 0.3), y:730 });
    TweenMax.from(mc_ribbon,1,{ delay:0.2, ease:Power4.easeOut, y:435 });

    //RIBBON TXT LIGHTNING
    TweenMax.from(mc_gold_ribbon_txt01,0.4,{ delay:1.5 , ease: Back.easeOut.config(1, 0.3), x:450 });
    //TweenMax.from(mc_icon_lightning,0.4,{ delay:2 , ease: Back.easeOut.config(1, 0.3), scale:0.2, alpha:0, transformOrigin: "50% 50%" });
    TweenMax.to(mc_gold_ribbon_txt01,0.4,{ delay:5 , ease: Back.easeIn.config(1, 0.3), x:450 });


    TweenMax.from(mc_gold_ribbon_txt02,0.4,{ delay:5.5, ease: Back.easeOut.config(1, 0.3), x:450 });
    //TweenMax.from(mc_icon_bomb,0.4,{ delay: 6 , ease: Back.easeOut.config(1, 0.3), scale:0.2, alpha:0, transformOrigin: "50% 50%"});
    TweenMax.to(mc_gold_ribbon_txt02,0.4,{ delay: 9 , ease: Back.easeIn.config(1, 0.3), x:450 });


    TweenMax.from(mc_gold_ribbon_txt03,0.4,{ delay:9.5, ease: Back.easeOut.config(1, 0.3), x:450 });
    //TweenMax.from(mc_icon_mushroom,0.4,{ delay: 10 , ease: Back.easeOut.config(1, 0.3), scale:0.2, alpha:0, transformOrigin: "50% 50%" });



}

function scene5()
{


  
 //TweenMax.delayedCall(2.5,scene6);
}

function scene6()
{

  
    TweenMax.delayedCall(3.5,scene7);
}

function scene7()
{
    TweenMax.delayedCall(3.5,scene8);
}

function scene8()
{



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
	var mc_bg = $('mc_bg');
	var mc_ribbon = $('mc_ribbon');
		var mc_gold_ribbon_BG = $('mc_gold_ribbon_BG');
		var mc_gold_ribbon_txt01 = $('mc_gold_ribbon_txt01');
			var mc_gold_ribbon_txt01_txt = $('mc_gold_ribbon_txt01_txt');
			var mc_icon_lightning = $('mc_icon_lightning');
		var mc_gold_ribbon_txt02 = $('mc_gold_ribbon_txt02');
			var mc_gold_ribbon_txt_02_txt = $('mc_gold_ribbon_txt_02_txt');
		var mc_gold_ribbon_txt03 = $('mc_gold_ribbon_txt03');
			var mc_gold_ribbon_txt03_txt = $('mc_gold_ribbon_txt03_txt');
			var mc_icon_mushroom = $('mc_icon_mushroom');
	var mc_product_seq = $('mc_product_seq');
		var mc_product_container = $('mc_product_container');
			var mc_product_seq_01 = $('mc_product_seq_01');
				var mc_product_pane = $('mc_product_pane');
				var mc_product_01_img = $('mc_product_01_img');
				var mc_product_01_price = $('mc_product_01_price');
			var mc_product_seq_02 = $('mc_product_seq_02');
				var mc_product_pane = $('mc_product_pane');
				var mc_product_02_price = $('mc_product_02_price');
				var mc_product_02_img = $('mc_product_02_img');
			var mc_product_seq_03 = $('mc_product_seq_03');
				var mc_product_pane = $('mc_product_pane');
				var mc_product_03_img = $('mc_product_03_img');
			var mc_prod_seq_04 = $('mc_prod_seq_04');
				var mc_product_pane = $('mc_product_pane');
				var mc_product_04_img = $('mc_product_04_img');
				var mc_prod_price_04 = $('mc_prod_price_04');
		var mc_product_btn_left = $('mc_product_btn_left');
		var mc_product_btn_right = $('mc_product_btn_right');
		var mc_cta_box = $('mc_cta_box');
			var mc_DiscoverCTA = $('mc_DiscoverCTA');
				var cta_on = $('cta_on');
				var cta_off = $('cta_off');
	var mc_header_txt = $('mc_header_txt');
	var mc_store_logo = $('mc_store_logo');
	var mc_mario_ribbon = $('mc_mario_ribbon');
	var mc_red = $('mc_red');
	var mc_introtxt = $('mc_introtxt');
		var mc_switchlogo_intro2 = $('mc_switchlogo_intro2');
		var mc_store_logo_introtxt = $('mc_store_logo_introtxt');
		var mc_introtxt_01 = $('mc_introtxt_01');
		var mc_introtxt_02 = $('mc_introtxt_02');
			var mc_starbundle_ribbon_lockup = $('mc_starbundle_ribbon_lockup');
		var mc_introtxt_03 = $('mc_introtxt_03');
			var mc_introtxt_03_txt = $('mc_introtxt_03_txt');
	var mc_switch_intro_bg = $('mc_switch_intro_bg');
    var mc_switch_intro = $('mc_switch_intro');

	var mc_switch_intro_left = $('mc_switch_intro_left');
	var mc_switch_intro_right = $('mc_switch_intro_right');
	var mc_keyline = $('mc_keyline');

