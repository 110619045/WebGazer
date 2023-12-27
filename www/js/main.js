// 攝影鏡頭相關
webgazer.showVideoPreview(false) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

var text = ['sky', 'cloud']; // key house Surrealism

let currentElement = null; // 用於追蹤當前停留的元素
let startTime = null;  // 開始第一個元素的時間
let PreviousElement = null;  // 取得前一個元素

window.onload = async function() {
    // console.log('網頁已載入');
    myFun = await import('./myfirebase.js'); 
    // let startTime = Date.now(); //設定開始時間

    // start the webgazer tracker
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
            // console.log('x,y：'+ data.x + ',' + data.y);  //檢查位置

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

                    currentElement.style.fontSize = '110%';

                    const itemFmName = currentElement.textContent +'-fm';
                    const itemFm = document.getElementsByClassName(itemFmName);
                    
                    for (var i = 0; i < itemFm.length; i++) {
                      var itemFmElement = itemFm[i];
                      if(typeof itemFmElement !== 'undefined'){
                        itemFmElement.style.backgroundColor = 'black';
                        itemFmElement.style.color = '#fff';
                      }else{
                        console.log('undefined');
                      } 
                    }
                    // console.log('itemFmElement:',itemFmElement);
                }
            }

            if(PreviousElement === null){       //初始化前一個元素
                PreviousElement = currentElement; 
                // console.log('PreviousElement：', PreviousElement);
                startTime = new Date().getTime();  //開始計第一個時
            }

            if(currentElement === PreviousElement){
                currentTime = new Date().getTime(); //現在時間
                // console.log("跟上一個一樣");
                totalTime = currentTime - startTime;
                if(totalTime >= 1500){
                    // console.log('總共看了：', totalTime);
                    // console.log("元素：",PreviousElement.id);
                    if(PreviousElement.id != text[0]){
                        var newLength = text.unshift(PreviousElement.id); // 加到陣列前端
                        console.log(text);
                        // getImages();
                    }
                }
            }
            
            if(currentElement !== PreviousElement){
                PreviousElement.style.fontSize = '95%';

                const PreviousElementFmName = PreviousElement.textContent +'-fm';
                const PreviousFm = document.getElementsByClassName(PreviousElementFmName);
                // console.log('PreviousElement：',PreviousElement);
                // console.log('currentElement：',currentElement);

                if (PreviousFm.length === 0) {
                  console.log('HTMLCollection 是空的');
              } else {
                  for (let i = 0; i < PreviousFm.length; i++) {
                      var PreviousFmElement = PreviousFm[i];
                      if (typeof PreviousFmElement !== 'undefined') {
                          setTimeout(function (element) {
                              return function () {
                                  // console.log('PreviousFmElement', i, '：', element);
                                  element.style.backgroundColor = '';
                                  element.style.color = '';
                              };
                          }(PreviousFmElement), 800 );
                      } else {
                          // console.log('undefined');
                      }
                  }
                  // console.log('HTMLCollection 不是空的');
              }
                startTime = new Date().getTime();  //設定新的開始時間
                // console.log("跟上一個不一樣");
                PreviousElement = currentElement;  //設定新的前一個元素
                // console.log('新的PreviousElement：', PreviousElement);
            }
            // console.log(text);
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
    
    document.getElementById('Pt1').addEventListener('click', function() {
      console.log('Button clicked!');
    });
};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

// Restart the calibration process by clearing the local storage and reseting the calibration point
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}

// Call API to get image
const getImages = async() => {
  
  const InputElement = JSON.stringify(text)
  // console.log('輸入為：' + text);
  // console.log(InputElement)

  const options ={
    method:"POST",
    headers:{
      // "Authorization":'Bearer ${API_KEY}',
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      "prompt": "Surrealism" + InputElement,
      "n": 1,
      size: "1024x1024"
    })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', options)
    const data = await response.json()

    data?.data.forEach(imageObject => {
      console.log(imageObject.url);
      myFun.setDataText(text, imageObject.url);
    });

  } catch (error){
    console.error(error)
  }
}