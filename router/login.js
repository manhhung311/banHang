const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const accountModel = require('../model/accountModel');
const checkLoginAcc = require('./checkLoginAcc');
var urlencodedParser = bodyparser.urlencoded({extended:false});
router.use(express.json());

var checkUse = async (use, password) => {
    var find = await accountModel.findOne({'usename': use }).exec().then((data)=>{
        if(data.password == password && data.errpass <= 5){
            token = jwt.sign({_id: data._id},'N$1*42');
            data.token = token ;
            data.save();
            return {code : 200, _id: data._id}
        }
        if(data.password != password){
            data.errpassword += 1 ;
            data.save();
            return {code : 403, _id: null}
        }
        if(data.password == password && data.errpass >= 5){
            return {code : 423, _id: null}
        }
        if(!data){
            return {code : 401, _id: null}
        }
    }).catch((err)=>{
        if(err){
        return {code : 500, _id: null}
        }
       
    })
    return find ;
}


router.get('/',(req,res)=>{
    res.status(200).json({status : true , result: 'Ok'})
})


router.post('/',urlencodedParser,async (req,res)=>{
    var Usename = req.body.usename ;
    console.log(Usename);
    var text = req.body.password ;
    console.log(text);
    const hmac = crypto.createHmac('sha512','N$1*42');
    var Password = hmac.update(text,'ascii').digest('hex'); 
    var result = await checkUse(Usename,Password);
    console.log(result)
    switch(result.code){
        case 200:
            var token = jwt.sign({_id: result._id},'N$1*42');
            res.status(200).json({status : true , result : 'Ok', token : token});
            break ;
        case 401:
            res.status(401).json({status: false , result: 'noUse',token : null});
            break ;
        case 403:
            res.status(403).json({status : false, result: 'falsePassword',token : null});
            break ;
        case 423:
            res.status(423).json({status : false , result: 'lockUse',token : null});
            break ;
        case 500:
            res.status(500).json({status : false, result: 'errServer',token : null});
            break ;
        default: 
            break ;
    }
})


module.exports = router ;