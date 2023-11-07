import {setData, consoleLogApp} from './firebase.js';

document.addEventListener('DOMContentLoaded', function() {
  
  const submitButton = document.getElementById('submit-icon')
  const InputElement = document.getElementById('textInput')
  const ImageSection = document.getElementById('image-section')

  const getImages = async() => {
      const text = InputElement.value;
      console.log('輸入為：' + text); //key house Surrealism

      setData(text);

      const options = {
        method:"POST",
        headers:{
          // "Authorization":'Bearer ${API_KEY}',
          'Authorization': `Bearer ${API_KEY}`,
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

        data?.data.forEach(imageObject => {
          const ImageContainer = document.createElement('div')
          ImageContainer.classList.add('image-container')
          const imageElement = document.createElement('img')
          imageElement.setAttribute('src',imageObject.url)
          ImageContainer.append(imageElement)
          ImageSection.append(ImageContainer)
        });
      } catch (error){
        console.error(error)
      }
  }

  submitButton.addEventListener('click', getImages)
});

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