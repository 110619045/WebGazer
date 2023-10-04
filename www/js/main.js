// 攝影鏡頭相關
webgazer.showVideoPreview(false) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */


window.onload = async function() {

    // data();

    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
            
            // if (data.x < 5*vh ){
            //     console.log("right");
            // }

            // // 获取眼动位置下的元素
            var elementUnderCursor = document.elementFromPoint(100, 200);
            // console.log(elementUnderCursor);
            // // 移除之前添加的效果类
            // document.querySelectorAll('.hover-effect-element.hovered').forEach(function(element) {
            // element.classList.remove('hovered');
            // });

            // if (elementUnderCursor) {
            // // 当用户的眼动位置位于某个元素上时，添加效果类
            // elementUnderCursor.classList.add('hovered');
            // };
        })
        .saveDataAcrossSessions(true)
        .begin();

        // webgazer.showVideoPreview(false) /* shows all video previews */
        //     .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        //     .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {
        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    setup();

};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}
