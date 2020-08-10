const express = require('express');
const router = express.Router();
const request = require('request');
const Const = require('../public/const');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '더기프팅컴퍼니 과제'});
});

router.post('/list', function (req, res, next) {
    let code = '';
    let obj = JSON.parse(JSON.stringify(req.body));
    let invoiceNumber = String(obj.invoiceNumber);
    switch (obj.radioText) {
        case 'cj' :
            code = '04';
            break;
        case 'hz' :
            code = '05';
            break;
        case 'kd' :
            code = '23';
            break;
    }
    request({
        url: "http://info.sweettracker.co.kr/api/v1/trackingInfo",
        method: "GET",
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        qs: {
            t_key: Const.API_KEY,
            t_code: code,
            t_invoice : invoiceNumber
        }
    }, function (err, response, body) {
        if (err) {
            console.log(err);
            return false;
        } else {
          res.render('result',{body: JSON.parse(body)});
        }
    });
});


module.exports = router;
