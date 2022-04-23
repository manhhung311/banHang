const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const accountAdminModel = require('../../model/accAdminModel');
var urlencodedParser = bodyparser.urlencoded({extended:false});
router.use(express.json());

var checkUse = async (use, password) => {
    var find = await accountAdminModel.findOne({'use': use }).exec().then((data)=>{
        if(data.password == password){
            var token = jwt.sign({_id: data._id},'N$1*42');
            Object.assign(data,{token : token});
            data.save();
            return {code : 200, _id: data._id}
        }
        if(data.password != password){
            data.errpassword += 1 ;
            console.log(2);
            return {code : 403, _id: null}
        }
        if(!data){
            console.log(4);
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
   // res.status(200).json({status : true , result: 'Ok'});
    res.render('loginAdmin');
})


router.post('/',urlencodedParser,async (req,res)=>{
    var Usename = req.body.usename ;
    console.log(Usename);
    var text = req.body.password ;
    console.log(text);
    const hmac = crypto.createHmac('sha512','N$1*42');
    var Password = hmac.update(text,'ascii').digest('hex'); 
    console.log(Password)
    var result = await checkUse(Usename,Password);
    console.log(result)
    switch(result.code){
        case 200:
            var token = jwt.sign({_id: result._id},'N$1*42');
            res.cookie('token',token);
            res.render('index',{
                linkCategory : false,
                linkUpload : false,
                linkProduct : false,
                linkEdit : false,
                linkSales : false

            });
            res.end ;
            break ;
        case 401:
            res.status(401).json({status: false , result: 'noUse'});
            break ;
        case 403:
            res.status(403).json({status : false, result: 'falsePassword'});
            break ;
        case 423:
            res.status(423).json({status : false , result: 'lockUse'});
            break ;
        case 500:
            res.status(500).json({status : false, result: 'errServer'});
            break ;
        default: 
            break ;
    }
})


module.exports = router ;