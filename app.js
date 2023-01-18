const express = require("express");
const app = express();
//express기본 사용 지정

const fs = require('fs');
//파일 열고 읽기용

const path = require('path');
//파일 경로 지정용

app.use(express.urlencoded({extended: false}));
// POST요청을 처리할 때 명령어를 바꾸어줌

app.use(express.static('public'));
// 'public'폴더 안에 있는 정적인 엘레먼트에 html이 액세스 할 수 있게 해줌

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//익스프레스의 템플릿 기능 해금

app.get("/", function (req, res) {
    res.render('index');
    //html경로를 사용하는 대신 ejs를 사용하여 html을 렌더링함
    
    /*
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    //node를 이용해 사용할 html 파일의 경로를 지정해줌
    res.sendFile(htmlFilePath);
    //node를 이용해 사용할 html 파일을 오픈하게 해줌
    */
    
});

app.get('/restaurants', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedrestaurants = JSON.parse(fileData);

    res.render('restaurants', {numberOfRestaurants: storedrestaurants.length});
    //변수는 서버에서 정하고 브라우저에는 html파일만 넘겨준다
});

app.get('/recommend', function(req, res) {
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    //json파일에 대한 경로지정
    const fileData = fs.readFileSync(filePath);
    //json파일을 열고 읽어옴
    const storedrestaurants = JSON.parse(fileData);
    //json파일을 자바스크립트(읽읅 수 있게) 형태의 데이터로 변환함

    storedrestaurants.push(restaurant);
    //변환한 자바스크립트 데이터에 restaurant데이터를 추가함
    fs.writeFileSync(filePath, JSON.stringify(storedrestaurants));
    //자바스크립트 데이터를 다시 json파일로 변환하여 저장함
    
    res.redirect('/confirm');
    //데이터 입력이 완료되고 새로고침했을 때 POST를 다시 쓰지 않도록 딴 페이지로 보냄
    
    
    /*
    const restaurantName = req.body.name;
    const restaurantAddress = req.body.address;
    const restaurantcuisine = req.body.cuisine;
    const restaurantWebsite = req.body.website;
    const restaurantDescription = req.body.description;
    body에서 하나하나 뽑아 올 수 있지만 위와 같이 한번에 뽑아 올 수도 있음
    */
});

app.get('/confirm', function(req, res) {
    res.render('confirm');
});

app.get('/about', function(req, res) {
    res.render('about');
});




app.listen(3000);
