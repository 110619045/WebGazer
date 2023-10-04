function data(){
    var dataArray = ['key', 'house', 'apple', 'game', 'water', 'shop', 'computer', 'technical'];
    var dataList = document.getElementById('data-list');
    
    for (var i = 0; i < dataArray.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = dataArray[i];
        dataList.appendChild(listItem);
    }

    console.log("data");
}

data();