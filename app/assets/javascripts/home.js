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
    
    this.isPlayingVideo = false;
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
                playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,rel:0}, 
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

    this.hideVideo = function(){
        
        this.isPlayingVideo = false;
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

    this.add = function(video){ 

        this.currentVideos.push(video);
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
        this.isPlayingVideo = true;
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