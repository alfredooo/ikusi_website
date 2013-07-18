/** should be in utilities **/

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
/********/


/** 
functions:

function YouTubeController(containerId);
this.loadVideo = function(videoIdd);
this.add = function(video);

notes:
I can use this function to change video id.
player.loadVideoById(videoId:String, startSeconds:Number, suggestedQuality:String):Void
 */  
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
    this.onPlayerReady = function(event) { 
        //event.target.playVideo(); 
    }; 
    this.onPlayerStateChange = function(event) { 

        this.player.setPlaybackQuality("hd720");  //hd1080
    } 
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
    
    var container = document.getElementById(this.containerId); 
    container.style.display = "none"; 
  
    this.loadVideo = function(videoIdd){ 
/* 
        this.backgroundImage = document.createElement('img'); 
        this.backgroundImage.src = "/images/IMG_0808SIZE.jpg"; 
        document.getElementById("coverImage").appendChild(this.backgroundImage); 
        this.backgroundImage.style.width = "700px"; 
        this.backgroundImage.style.height = "470px"; 
  
        var self = this; 
        this.backgroundImage.addEventListener("click",function(){self.playVideo();}); 
*/
    }; 
    
    /**
     * hides the current video and we pause it too.
     */
    this.hideVideo = function(){
        
        this.player.pauseVideo();
        var videoContainer = document.getElementById("vdPlayer");
        $('#'+this.containerId).fadeOut( function() {
            $('#bkdPly').fadeOut();
        });
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
    //play the first video that we have. 
    this.playVideo = function(){ 

        if (!this.selectedVideo){ 
            this.selectedVideo = this.currentVideos[0]; 
        } 
  
        /* I need to work on how to disapear this! when compleated! */
        this.player.videoId = this.selectedVideo.youTubeId; 
        this.player.playVideo(); 
  
        var self = this; 
        setTimeout(function(){ 
            if (self.selectedVideo.coverId){ 
                var coverImage = document.getElementById(self.selectedVideo.coverId); 
                //coverImage.style.display = "none"; 
                $('#bkdPly').fadeIn( function() {
                    // Animation complete.
                    document.getElementById(self.containerId).style.display = "block";
                  });
                //document.getElementById("bkdPly").style.display = "block"; 
            } 
        },300)
    }
}