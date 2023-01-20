const fs = require('fs');
const path = require('path');



const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');
//json파일에 대한 경로지정



function getStoredrestaurants() {
    const fileData = fs.readFileSync(filePath);
    //json파일을 열고 읽어옴
    const storedrestaurants = JSON.parse(fileData);
    //컴퓨터가 urlencoded를 통해 추출한 텍스트를 JSON데이터라고 인식할 수 있게 해줌
    return storedrestaurants;
}

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}



module.exports = {
    getStoredrestaurants: getStoredrestaurants,
    storeRestaurants: storeRestaurants
    //오른쪽은 내가 내보낼 함수 이름, 왼쪽 내가 내보낸 파일에서 사용할 이름
};