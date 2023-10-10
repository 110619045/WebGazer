// 攝影鏡頭相關
webgazer.showVideoPreview(false) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */


// //一開始眼動的時間
// var gazeStartTime = null;
// var elementUnderCursor = null;
let currentElement = null; // 用于跟踪当前停留的元素
// console.log('gazeStartTime0：'+gazeStartTime);
window.onload = async function() {
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, timestamp) {
            console.log('timestamp：'+timestamp);
            /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            
            if(data == null){
                return;
            }

            const fontElements = document.getElementsByTagName('font');
            var x = data.x;
            var y = data.y;
            
            let startTime = null; // 用于跟踪停留的开始时间

            // console.log('x,y：'+ data.x + ',' + data.y);
            // console.log('fontElements：'+ fontElements);
            
            // 迭代 font 元素，檢查獲得哪個元素
            for (const fontElement of fontElements) {
                const rect = fontElement.getBoundingClientRect();
                // console.log('fontElement：'+ fontElement);
                // console.log('rect：' rect.left);
                // console.log('currentElement0：', currentElement);

                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    // 找到匹配的 font 元素
                    console.log('找到匹配的 font 元素：', fontElement);
                    // console.log('currentElement：', currentElement);
                    
                    // if (currentElement === fontElement) {
                    //     // 如果是同一个元素，检查停留时间
                    //     const currentTime = new Date().getTime();
                    //     const elapsedTime = currentTime - startTime;
                    //     console.log('currentTime:'+ currentTime);
                    //     console.log('startTime:'+ startTime);
                    //     console.log('elapsedTime：'+ elapsedTime);

                    //     if (elapsedTime >= 3000) { // 3秒（3000毫秒）
                    //         // console.log('停留超过三秒的 font 元素：', fontElement);
                    //     }
                    // } else {
                    //     // 否则，重置计时器
                    //     currentElement = fontElement;
                    //     startTime = new Date().getTime();
                    // }

                    const currentTime = new Date().getTime();
                    const elapsedTime = currentTime - startTime;

                    // console.log('currentTime：', currentTime);
                    // console.log('startTime：', startTime);
                    // console.log('elapsedTime：', elapsedTime);

                    if (elapsedTime >= 3000) { // 3秒（3000毫秒）
                        // console.log('停留超过三秒的 font 元素：', fontElement);
                    }
                    
                    // 重置计时器
                    currentElement = fontElement;
                    startTime = currentTime;

                }
            }

            // if(data == null){
            //     elementUnderCursor = null;
            //     return;
            // }else {
            //     // 獲取眼動位置下的元素
            //     elementUnderCursor = document.elementFromPoint(data.x, data.y);
            // }
            // console.log('elementUnderCursor:'+elementUnderCursor);



            // console.log('gazeStartTime：'+gazeStartTime);

            //檢查眼動為是否停留在元素上
            // if(isElementUnderGaze(elementUnderCursor, x, y)){
                
            //     if (gazeStartTime === null) {
            //         gazeStartTime = new Date().getTime();
            //         // console.log(gazeStartTime);
            //     } else {
            //         var currentTime = new Date().getTime();
            //         var gazeDuration = currentTime - gazeStartTime;

            //         // 停留時間觸發事件
            //         if (gazeDuration >= 3000) {
            //             // console.log(elementUnderCursor);
            //             // console.log('元素上停留超過3秒！');

            //             // 加入hovered
            //             elementUnderCursor.classList.add('hovered');
            //             gazeDuration = currentTime - gazeStartTime;

            //         }else{
            //             elementUnderCursor.classList.remove('hovered');
            //         }
            //     }
            // }else {
            //     //沒有元素
            //     gazeStartTime = null;
            // }

            // console.log('gazeStartTime2：'+gazeStartTime);

        })
        .saveDataAcrossSessions(true)
        .begin();

        // webgazer.showVideoPreview(false) /* shows all video previews */
        //     .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        //     .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    // var setup = function() {
    //     //Set up the main canvas. The main canvas is used to calibrate the webgazer.
    //     var canvas = document.getElementById("plotting_canvas");
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     canvas.style.position = 'fixed';
    // };
    // setup();

};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}


//  Restart the calibration process by clearing the local storage and reseting the calibration point

function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}


function isElementUnderGaze(element, x, y) {
    if(element!=null){
        var elementRect = element.getBoundingClientRect();
        // console.log(element);
        // console.log(elementRect.left);
        return x >= elementRect.left && x <= elementRect.right && y >= elementRect.top && y <= elementRect.bottom;    
    }
}