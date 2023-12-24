window.addEventListener = async function() {
    // 獲取所有擁有grouped-item类别的元素
    const groupedItems = document.querySelectorAll('.grouped-item');

    // 监听每个元素的悬停和离开事件
    groupedItems.forEach(item => {
        
        item.addEventListener('mouseover', () => {
            // 应用样式到当前组的所有元素
            const groupClass = item.classList[1]; // 获取第二个类别，例如 'book'
            const groupElements = document.querySelectorAll(`.${groupClass}`);
            groupElements.forEach(element => {
                if (element === item) {
                    // 当前元素放大文字
                    element.style.fontSize = '1.2em';
                } else {
                    // 其他元素改变背景颜色
                    element.style.backgroundColor = 'black';
                    element.style.color = '#fff';
                }
            });
        });

        item.addEventListener('mouseout', () => {
            // 移除样式
            mouseoverTimeout = setTimeout(() => {
                const groupClass = item.classList[1];
                const groupElements = document.querySelectorAll(`.${groupClass}`);
                
                groupElements.forEach(element => {
                    if (element === item) {
                        // 当前元素还原文字大小
                        element.style.fontSize = '';
                    } else {
                        // 其他元素还原背景颜色
                        element.style.backgroundColor = '';
                        element.style.color = '';
                    }
                });
            }, 500);
        });
    });

}
