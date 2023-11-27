let myFun;

window.onload = async function() {
  myFun = await import('./myfirebase.js'); 

  const ImageSection = document.getElementById('image-section')

  myFun.getData();
  // data?.data.forEach(imageObject => {
  //   const ImageContainer = document.createElement('div')
  //   ImageContainer.classList.add('image-container')
  //   const imageElement = document.createElement('img')
  //   imageElement.setAttribute('src',imageObject.url)
  //   ImageContainer.append(imageElement)
  //   ImageSection.append(ImageContainer)
  // });

  // submitButton.addEventListener('click', getImages)
};
