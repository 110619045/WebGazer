let myFun;
// myFun = import('./myfirebase.js'); 
// myFun.getData();

window.onload = async function() {
  myFun = await import('./myfirebase.js');

  const ImageSection = document.getElementById('image-section');
  let link = 'a';

  setInterval(async () => {
    try {
      const imgUrl = await myFun.getData();
      
      if( link === imgUrl){
        console.log('imgUrl odd = ' + imgUrl);
      }else{
        link = imgUrl;
        console.log('imgUrl = ' + imgUrl);
        
        ImageSection.innerHTML = ''; //清除原本的照片

        const ImageContainer = document.createElement('div')
        ImageContainer.classList.add('image-container')
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src',imgUrl)
        ImageContainer.append(imageElement)
        ImageSection.append(ImageContainer)
      }

    } catch (error) {
      console.error(error);
    }
  }, 3000);

  

};
