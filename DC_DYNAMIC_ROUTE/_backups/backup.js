// Replace the variables with new filenames.
/*-------------------------------------------------------------------------------------------------------------------------------------------------	*/
//px//
var WID = window.innerWidth;
var HEI = window.innerHeight;
console.log("backup: "+WID+"x"+HEI);

var defaultExitURL = (useDynamicExit) ? dynamicExit : "https://www.diy.com";
var backup_image = "backup_"+WID+"x"+HEI+".jpg";


if (isLocal) {
    backup_image = 'images/' + backup_image;
}
else {
    backup_image = dc[assetDir][backup_image].Url;
    backup_image = backup_image.replace("http://", "https://");
} 

    

function setListeners() {
    container.addEventListener("click", handleClick);
    container.style.cursor = 'pointer';
}

function writeHTMLdivs() {
		
	var divToWrite = '<img src="'+ backup_image +'" width="'+ WID +'" height="'+ HEI +'">';
 
    container.innerHTML = divToWrite; // writing css for root div	
    container.style.overflow = "hidden";
    container.style.position = "absolute";
    //container.style.width = WID - 2 + "px";
    //container.style.height = HEI - 2 + "px";
    container.style.top = "0px";
    container.style.left = "0px";
    container.style.margin = "auto";
    container.style.display = "none";
    //container.style.border = "1px solid #666666";

    var inApp = studio.common.Environment.hasType(studio.common.Environment.Type.IN_APP); 
    if(!inApp &&  WID==320 && HEI==50) { /*container.style.top = "430px";*/}
    if(!inApp &&  WID==728 && HEI==90) { /*container.style.left = "18px";*/}
}
 
function handleClick(event) {
        var target = event.target || event.srcElement;
        log("handleClick:" + target.id);
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; //log("main click", window.clickTag);
        Enabler.exitOverride('default', defaultExitURL);
        trackClick(event.clientX, event.clientY, 'default', defaultExitURL);
    } 
	

//call by dynbootstrap.js on scripts loaded
function startDefault() 
{ 

   setListeners();
 
   writeHTMLdivs();
   
   container.style.display = "block";
}
 


//var container = $('root');
	var container = $('root') || $('content_dc');
		 
	 
 


