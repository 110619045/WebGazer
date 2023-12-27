let myFun; 

document.addEventListener('DOMContentLoaded', async function() {
  myFun = await import('./myfirebase.js'); 
  
  const submitButton = document.getElementById('submit-icon')
  const InputElement = document.getElementById('textInput')
  const ImageSection = document.getElementById('image-section')

  const getImages = async() => {
      const API_KEY = "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" //sd-test
      const text = InputElement.value;
      console.log('輸入為：' + text); //key house Surrealism

      const options = {
        method:"POST",
        organization: 'org-t1HMopmI8iwe5MXN1lAKWHQB',
        headers:{
          // "Authorization":'Bearer ${API_KEY}',
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          "prompt": InputElement.value,
          "n": 1,
          size: "1024x1024",
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
          const imgURL = imageObject.url
          // console.log(imgURL)
          myFun.setDataText(text, imgURL);
        });

      } catch (error){
        console.error(error)
      }
  }

  submitButton.addEventListener('click', getImages)
});