{/* <script type="module" src="your-es6-module-file.js"></script> */}
const API_KEY = "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"
const submitIcon = document.querySelector("#submit-icon")

const InputElement = ocument.querySelector("input")

const getImages = async() => {
  const options ={
    method:"POST",
    Headers:{
      "Authorization":'Bearer ${API_KEY}',
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      "prompt": InputElement.value,
      "n": 1,
      "size": "256x256"
    })
  }
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', options)
    const data = await response.json()
    console.log(data)
  } catch (error){
    console.error(error)
  }
}

submitIcon.addEventListener('click', getImages)

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-IuMJAIzBzapUPslPCf0EQzV2",
//     // apiKey: process.env.OPENAI_API_KEY,
//     apiKey : ,
// });

// const openai = new OpenAIApi(configuration);
// // const response = await openai.listEngines();

// const response = await openai.createImage({
//     prompt: "a white siamese cat",
//     n: 1,
//     size: "1024x1024",
//   });
// image_url = response.data.data[0].url;
// console.log(image_url);