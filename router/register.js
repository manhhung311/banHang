const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accountModel = require('../model/accountModel');
const router = express.Router();

var urlencodedParser = bodyparser.urlencoded({extended: false});


var check = async (value)=>{
   var findmongoose = await accountModel.findOne({ 'usename' : value}).exec().then((data)=>{
    if(data)  return 400
    if(!data) return 200
}).catch((err)=>{
    return 500 
}) ;
    return findmongoose ;
}

var addAcount = (use,name,pass,add,number,birth)=>{
    accountModel.create({
        usename : use,
        name : name,
        password : crypto.createHmac('sha512','N$1*42').update(pass).digest('hex'),
        address : add,
        numberPhone : number,
        birth : birth,
        errpass :0,
        token : "" 

    
    });
}

router.get('/',(req,res,next)=>{
    res.status(200).json({status : 'Ok'});
})


router.post('/',urlencodedParser, async (req,res)=>{
    var usename = req.body.usename ;
    console.log(usename);
    var name = req.body.name ;
    var password = req.body.password ;
    var address = req.body.address ;
    var numberPhone = req.body.numberPhone ;
    var birth = req.body.birth ;
    
    var result = await check(usename);

    switch(result){
        case 400 : 
            res.status(400).json({status: false ,result : 'useAlreadyExists'});
            res.end ;
            break ;
        case 500 :
            res.status(500).json({status: false ,result : 'errServer'});
            res.end ;
            break ;
        case 200 :
            res.status(200).json({status : true, result : 'createSuccessful'});
            addAcount(usename,name,password,address,numberPhone,birth);
            res.end ;
            break ;
        default : 
            break ;
    }
      
    
})

module.exports = router ;