const express = require("express");
const app = express();
//express기본 사용 지정
const fs = require('fs');
//파일 열고 읽기용
const path = require('path');
//파일 경로 지정용


const defaultroutes = require('./routes/default');
const restaurantroutes = require('./routes/restaurants');
//외부 js파일코드를 불러옴



app.set('view engine', 'ejs');
//익스프레스의 ejs 템플릿 사용 기능 해금
app.set('views', path.join(__dirname, 'views'));
//ejs파일이 있는 경로를 지정해줌


app.use(express.static('frontend-site'));
// 'frontend-site'폴더 안에 있는 정적인 엘레먼트(CSS,JS)에 html이 액세스 할 수 있게 해줌
app.use(express.urlencoded({ extended: false }));
// POST요청을 처리할 때 명령어를 바꾸어줌



app.use('/', defaultroutes);
app.use('/', restaurantroutes);
//외부 js파일코드를 필터링하여 사용



app.use(function(req, res) {
    res.status(404).render('404');
});

app.use(function(err, req, res, next) {
    res.status(500).render('500');
});

app.listen(3000);
