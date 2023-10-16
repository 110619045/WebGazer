// 攝影鏡頭相關
webgazer.showVideoPreview(false) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

// 取得Firebase引用
// const db = firebase.database();
var text = ['sky', 'cloud'];

let currentElement = null; // 用於追蹤當前停留的元素
let startTime = null;  //開始第一個元素的時間
let PreviousElement = null;  //取得前一個元素
window.onload = async function() {
    // let startTime = Date.now(); //設定開始時間

    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, timestamp) {
            // console.log('timestamp：'+timestamp);
            /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            
            if(data == null){
                return;
            }

            const fontElements = document.getElementsByTagName('font');
            var x = data.x;
            var y = data.y;
            
            // console.log('startTime:', startTime); 
            // console.log('x,y：'+ data.x + ',' + data.y);
            // console.log('fontElements：'+ fontElements);
            // console.log('currentElement：', currentElement);
            
            // 迭代 font 元素，檢查獲得哪個元素
            for (const fontElement of fontElements) {
                const rect = fontElement.getBoundingClientRect();
                // console.log('currentElement0：', currentElement);
                // console.log(fontElement)
                // 找到目前停留的font元素
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    // console.log('找到匹配的 font 元素：', fontElement);
                    // console.log("PreviousElement:" + PreviousElement);
                    currentElement = fontElement;
                    // console.log('currentElement1：', currentElement);
                }
            }
            // console.log('currentElement2：', currentElement);

            if(PreviousElement === null){       //初始化前一個元素
                PreviousElement = currentElement; 
                // console.log('PreviousElement：', PreviousElement);
                startTime = new Date().getTime();  //開始計第一個時
            }

            if(currentElement === PreviousElement){
                currentTime = new Date().getTime(); //現在時間
                console.log("跟上一個一樣");
                totalTime = currentTime - startTime;

                if(totalTime >= 1500){
                    console.log('總共看了：', totalTime);
                    // PreviousElement.classList.remove('rehovered');
                    PreviousElement.classList.add('hovered');
                    console.log("元素：",PreviousElement.id);
                    if(PreviousElement.id != text[0]){
                        var newLength = text.unshift(PreviousElement.id); // 加到陣列前端
                    }
                }
            }

            if(currentElement !== PreviousElement){
                // PreviousElement.classList.add('rehovered');
                PreviousElement.classList.remove('hovered');
                
                startTime = new Date().getTime();  //設定新的開始時間
                console.log("跟上一個不一樣");
                PreviousElement = currentElement;       //設定新的前一個元素
                console.log('新的PreviousElement：', PreviousElement);
            }

            console.log(text);
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