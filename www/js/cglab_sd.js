let myFun; 

document.addEventListener('DOMContentLoaded', async function() {
  myFun = await import('./myfirebase.js'); 
  
  const submitButton = document.getElementById('submit-icon')
  const InputElement = document.getElementById('textInput')
  const ImageSection = document.getElementById('image-section')

  const getImages = async() => {

    const text = InputElement.value;
      console.log('輸入為：' + text); //key house Surrealism

      const options = {
        
        method:"POST",
        organization: 'org-t1HMopmI8iwe5MXN1lAKWHQB',
        headers:{
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          "prompt": InputElement.value,
          "n": 1,
          size: "1024x1024",
        })
      }

      try {
        // const response = await fetch('https://api.openai.com/v1/images/generations', options)
        const response = await fetch('http://140.119.164.168:7861/sdapi/v1/txt2img', options)
        
        const data = await response.json()
        console.log(data)
        const ImageContainer = document.createElement('div')
        ImageContainer.classList.add('image-container')
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src',"data:iamge/jpeg;base64,"+data.images[0])
        // console.log('data:' + data.images)
        // console.log('0:' + data.images[0])

        ImageContainer.append(imageElement)
        ImageSection.append(ImageContainer)

        // myFun.setDataText(text, imgURL);

        // data?.data.forEach(imageObject => {
          
        //   const imgURL = imageObject.url
        //   // console.log(imgURL)
         
        // });
      }  
      catch (error){
        console.error(error)
      }
  }

  submitButton.addEventListener('click', getImages)
});