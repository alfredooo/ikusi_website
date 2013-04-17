/**
 * Created by IntelliJ IDEA.
 * User: alfredo
 * Date: 19/07/12
 * Time: 12:31 AM
 * To change this template use File | Settings | File Templates.
 */

var sliderController = function(){
    var active = false;

    return {
        setActive:function(value){
            active = value;
            if (value){
                $('.zuperSlider').zuperSlider('resumeSlideshow');
            } else {
                $('.zuperSlider').zuperSlider('stopSlideshow');
            }
        },
        onPlay:function(){
            sliderController.setActive(false);
        },
        onStopOrPause:function(){
            sliderController.setActive(true);
        }
    }
}();
