const express = require('express');
const router = express.Router();
const uuid = require('uuid');
//랜덤한 아이디 생성용
const restaurantdata = require('../utilsplit/restaurant-data');
//외부 js파일코드를 불러옴



router.get('/restaurants', function (req, res) {
    let order = req.query.order;
    let nextorder = 'desc';
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }

    if (order === 'desc') {
        nextorder = 'asc';
    }

    const storedrestaurants = restaurantdata.getStoredrestaurants();

    storedrestaurants.sort(function (resA, resB) {
        if (
        (order === 'asc' && resA.name > resB.name) || 
        (order === 'desc' && resA.name < resB.name) 
        ){
            return 1;
        }
        return -1;
        //restaurant 이름을 오름차순으로 정렬한다.
    });

    res.render('restaurants', {
        numberOfRestaurants: storedrestaurants.length,
        restaurants: storedrestaurants,
        nextorder: nextorder
    });
    //변수는 서버에서 정하고 브라우저에는 html파일만 넘겨준다
});

router.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;
    const storedrestaurants = restaurantdata.getStoredrestaurants();

    for (const restaurant of storedrestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurants-detail', { restaurant: restaurant });
        }
    }

    res.status(404).render('404');
});


router.get('/recommend', function (req, res) {
    res.render('recommend');
});

router.post('/recommend', function (req, res) {
    const restaurant = req.body;
    //body에서 제출된 데이터를 const로 저장
    restaurant.id = uuid.v4();
    //restaurant에 id(변수이름은 변경가능)라는 변수를 만들고 uuid를 통해 랜덤한 아이디를 생성해 저장

    const storedrestaurants = restaurantdata.getStoredrestaurants();
    //파일을 분리, 함수로 만들어서 사용

    storedrestaurants.push(restaurant);
    //JSON 파일에 데이터를 추가함

    restaurantdata.storeRestaurants(storedrestaurants);
    //파일을 분리, 함수로 만들어서 사용2

    res.redirect('/confirm');
    //데이터 입력이 완료되고 새로고침했을 때 POST를 다시 쓰지 않도록 딴 페이지로 보냄


    /*
    위와 같이 한번에 뽑아 올 수도 있지만 아래처럼 body에서 하나하나 뽑을 수도 있음
    const restaurantName = req.body.name;
    const restaurantAddress = req.body.address;
    const restaurantcuisine = req.body.cuisine;
    const restaurantWebsite = req.body.website;
    const restaurantDescription = req.body.description;
    
    */
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});



module.exports = router;
