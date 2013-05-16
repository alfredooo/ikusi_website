/**
 * Created with JetBrains WebStorm.
 * User: alfredoo
 * Date: 16/04/13
 * Time: 11:19 PM
 * To change this template use File | Settings | File Templates.
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
    this.player = new YT.Player( this.containerId, {
        height: '470',
        width: '700',
        suggestedQuality:"hd720",
        "videoId":"W8Gi12mWtrs",
        playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,rel:0 },
        events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange
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
                coverImage.style.display = "none";
                document.getElementById(self.containerId).style.display = "block";
            }
        },300)
    }
    this.onPlayerReady = function(event) {
        //event.target.playVideo();
    };
    this.onPlayerStateChange = function(event) {

        this.player.setPlaybackQuality("hd720");  //hd1080
    }
}