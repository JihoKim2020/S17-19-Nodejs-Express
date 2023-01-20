const express = require('express');
const router = express.Router();


router.get("/", function (req, res) {
    res.render('index');
    //앞서 ejs경로를 지정해 주었으므로 경로안에 있는 ejs 파일명만 이용해서 불러올 수 있다.

    /*
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
        ★node를 이용해 사용할 html 파일의 경로를 지정해줌
    res.sendFile(htmlFilePath);
        ★node를 이용해 사용할 html 파일을 오픈하게 해줌
    */

});


router.get('/about', function (req, res) {
    res.render('about');
});


module.exports = router;