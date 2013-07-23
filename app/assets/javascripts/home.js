/** should be in utilities **********************************************************/

/* firefox bind functionality */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

/* add event listener functionality for ie8 */
(function() {
  if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault=function() {
      this.returnValue=false;
    };
  }
  if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation=function() {
      this.cancelBubble=true;
    };
  }
  if (!Element.prototype.addEventListener) {
    var eventListeners=[];
    
    var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var self=this;
      var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (listener.handleEvent) {
          listener.handleEvent(e);
        } else {
          listener.call(self,e);
        }
      };
      if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
          if (document.readyState=="complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
        
        if (document.readyState=="complete") {
          var e=new Event();
          e.srcElement=window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
      }
    };
    var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var counter=0;
      while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
          if (type=="DOMContentLoaded") {
            this.detachEvent("onreadystatechange",eventListener.wrapper);
          } else {
            this.detachEvent("on"+type,eventListener.wrapper);
          }
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener=addEventListener;
      HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener=addEventListener;
      Window.prototype.removeEventListener=removeEventListener;
    }
  }
})();

/******* end utils *******************************************************************/
document.addEventListener("backbutton", function (e) {
    alert("heyy");
});
/*** 
 var tag = document.createElement('script'); 
 tag.src = "https://www.youtube.com/iframe_api"; 
 var firstScriptTag = document.getElementsByTagName('script')[0]; 
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
 */
function YouTubeController(containerId){
  
    this.currentVideos = []; 
    this.selectedVideo = null; 
    this.player = null; 
    this.displayImage = ""; 
    this.containerId = containerId;     
    this.container = document.getElementById(this.containerId); 
    this.container.style.width = "1px";
    this.container.style.height = "1px";
    //this.container.style.display = "none";
    this.runningJavascript;
    
    this.playerLoaded = false;
    this.playVideoNow = false;
  
    this.loadVideoPlayer = function(videoIdd){ 

        if (!this.playerLoaded){
            
            var self = this;
            this.player = new YT.Player( this.containerId, {
                height: 'auto',
                width: 'auto', 
                suggestedQuality:"hd720", 
                "videoId":"ejWGThDRllE", 
                playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,rel:0,hd:1 }, 
                events: { 
                    'onReady': self.onPlayerReady.bind(self), 
                    'onStateChange': self.onPlayerStateChange.bind(self)
                }
            });
            this.container = document.getElementById(this.containerId);
            this.container.style.width = "1px";
            this.container.style.height = "1px";
        }
    }; 
    
    /**
     * hides the current video and we pause it too.
     */
    this.hideVideo = function(){
        
        this.player.stopVideo();
        this.player.destroy();
        $('#bkdPly').fadeOut();
        
        this.playerLoaded = false;
        this.playVideoNow = false;
        setTimeout(function(){
            this.loadVideoPlayer()
        }.bind(this),300);
        
        if (this.runningJavascript){
            window.clearInterval(this.runningJavascript);
            this.runningJavascript = null;
        }
    }
  
    /** 
     * if the cover is specified, will attach an on click listener. 
     * expected video parameter: 
     * 
     * {"youTubeId":"id", 
     * "coverId":"div Id of the cover",        <- optional 
     * "description": "videoDescription"}      <- optional 
     **/
    this.add = function(video){ 

        this.currentVideos.push(video); 
        if (video.coverId){ 
            var self = this; 
            var cover = document.getElementById( video.coverId ); 
            cover.addEventListener("click",function(){self.playVideo();}); 
        } 
        return this; 
    }; 
    
    this.onPlayerReady = function(event) {
        
        this.playerLoaded = true;
        if ( this.playVideoNow ){
            this.reproduceTheVideo();
        }
    }
    
    this.reproduceTheVideo = function(){
        
        if (!this.selectedVideo){ 
            this.selectedVideo = this.currentVideos[0]; 
        }

        this.player.videoId = this.selectedVideo.youTubeId; 
        this.player.playVideo(); 
  
        var self = this; 
        setTimeout(function(){ 
            if (self.selectedVideo.coverId){ 
                var coverImage = document.getElementById(self.selectedVideo.coverId);  
                $('#bkdPly').fadeIn( function() {
                    var playerr = document.getElementById(self.containerId);
                    playerr.style.display = "block";
                    playerr.style.width = "100%";
                    playerr.style.height = "100%";
                });
            }
        }.bind(this),300)
        
        this.runningJavascript = setInterval(function(){
            
            window.focus(); 
            // Remove focus from any focused element
            if (document.activeElement) {
                document.activeElement.blur();
            }
                      
        },500);
    }
    
    this.onPlayerStateChange = function(event) { 
        //alert("chad");
        //this.player.setPlaybackQuality("hd720");  //hd1080
    }

    this.playVideo = function(){ 

        if (!this.playerLoaded){
            this.playVideoNow = true;
        } else {
            this.reproduceTheVideo(); 
        }
    }
    
    this.loadVideoPlayer();
}