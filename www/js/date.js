window.addEventListener = async function() {
    // 獲取當前日期
    const currentDate = new Date();

    // 將日期轉換成本地語言的格式
    const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long', // 星期的全名
    year: 'numeric', // 年份
    month: 'long', // 月份的全名
    day: 'numeric' // 日期
    });

    // 將日期顯示在 HTML 中
    document.getElementById('currentDate').textContent = `${formattedDate}`;
}