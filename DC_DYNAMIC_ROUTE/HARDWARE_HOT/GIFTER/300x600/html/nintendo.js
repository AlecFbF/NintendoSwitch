var svgNS = "http://www.w3.org/2000/svg"; //svginfo

var nintendo = {	
	

	emergencyOverride:function(){
	/*incase anything needs to be updated - this gets called after all things loaded*/
	//console.log("99999999999999999999999999999999999999999999999999999999999999999999THIS IS NINTENDO");
	log("nintendo.emergencyOverride");
	},

	animateIntroLogoIn:function(rightStart,rightFinish,LeftYoyo){

	//this needs work to accomodate all sizes.
	log("IntroSequence");
	fbf.show(mc_switch_intro, mc_switch_intro_bg, mc_switch_intro_left, mc_switch_intro_right);


    TweenMax.set(mc_switch_intro_right, {y:rightStart}); //-60

	TweenMax.to(mc_switch_intro_right, 0.55, {y:rightFinish, ease:Back.easeInOut.config(3), delay:0.25, repeatDelay:1.7 }); //0
	TweenMax.to(mc_switch_intro_left, 0.135, {y:LeftYoyo, ease:Sine.easeInOut, delay:0.52, yoyo: true, repeat:1}); //14
	
	},


	animateIntroLogoOut:function(){

     TweenMax.to(mc_switch_intro_right,0.5,{ alpha:0, onComplete:fbf.displayNone,onCompleteParams:[mc_switch_intro_right] });	
	 TweenMax.to(mc_switch_intro_left,0.5,{ alpha:0, onComplete:fbf.displayNone,onCompleteParams:[mc_switch_intro_left] });
	 TweenMax.to(mc_switch_intro_bg,0.5,{ alpha:0, onComplete:fbf.displayNone,onCompleteParams:[mc_switch_intro_bg] });
	},
	

	duplicateBackground:function(divToDuplicate,tileDiv,howManyTiles){
    log("dupBG");
    for (var i = 0; i < howManyTiles; i++) { 
    	log("tile");
    	var tiles = [];
    	var tile = divToDuplicate.appendChild(divToDuplicate.children[0].cloneNode(true));
    	tiles.push(tile);
        tile.id = tileDiv+i;
  		var tileWidth = tileDiv.style.width.split("px")[0];
     	TweenMax.set(tileDiv+i,{x:i*tileWidth});
		}
	},

	animateBackground:function(divToAnimate,duration,howManyTiles){

  	var BGWidth = divToAnimate.style.width.split("px")[0];
    TweenMax.to(divToAnimate, duration, {x:-1*BGWidth*(howManyTiles-1), ease: Power0.easeInOut});
	},


	textTypeAnimation:function(divToAnimate,layerToStartFrom,gapBetweenLetters,Ydistance,del){
	for (var i = layerToStartFrom; i < divToAnimate.children.length; i++) 
        {     
        TweenMax.from(divToAnimate.children[i],0.3,{alpha:0,delay:del+(gapBetweenLetters*i),ease: Back.easeOut, y:"+="+String(Ydistance)});
        }
	},

	textSlideAnimation:function(divToAnimate,LayerToStartFrom,gapBetweenLines,Xdistance,del){
	      for (var i = LayerToStartFrom; i < divToAnimate.children.length; i++) 
       {     
           //if(mc.children[1].children[i].getAttribute("data-type") == "flash.display::MovieClip" )
          //{
          	log("boom");
              if(i%2){TweenMax.from(divToAnimate.children[i],1,{alpha:0,x:"-="+String(Xdistance),delay:del+(gapBetweenLines*i),ease: Expo.easeOut}); }
              else {TweenMax.from(divToAnimate.children[i],1,{alpha:0,x:"+="+String(Xdistance),delay:del+(gapBetweenLines*i),ease: Expo.easeOut});}


          //} 
          //else
          //{
     
         // }
       }		
	}

}



