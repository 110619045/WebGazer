let myFun;
// myFun = import('./myfirebase.js'); 
// myFun.getData();

window.addEventListener = async function() {
  myFun = await import('./myfirebase.js');
  console.log('show');
  const ImageSection = document.getElementById('image-section');
  let link = 'a';

  setInterval(async () => {
    try {
      const imgUrl = await myFun.getData();
      
      if( link === imgUrl) {
        console.log('imgUrl odd = ' + imgUrl);
      }else {
        link = imgUrl;
        console.log('imgUrl = ' + imgUrl);

        // 添加溶解動畫
        ImageSection.style.animation = 'dissolve 5s forwards';
        // 等待溶解動畫完成
        await new Promise(resolve => setTimeout(resolve, 5000));
        // 清除原本的照片
        ImageSection.innerHTML = '';
        // 恢復溶解動畫
        ImageSection.style.animation = 'none';

        const ImageContainer = document.createElement('div');
        ImageContainer.classList.add('image-container', 'fade-in');
        const imageElement = document.createElement('img');
        imageElement.setAttribute('src', imgUrl);
        ImageContainer.append(imageElement);
        ImageSection.append(ImageContainer);
      }
    } catch (error) {
      console.error(error);
    }
  }, 3000);
};