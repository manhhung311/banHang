const express = require('express');
const router = express.Router();
var bannerModel = require('../model/bannerModel');

var loadImg = async ()=> {
   var result = await bannerModel.find().exec().then((data)=>{
        if(data) {
            return {code: 200 , data : data} ;
        }
        if(!data) {
            return {code : 404 , data : null} ;
        }
    }).catch((err)=> {
        if(err){
            return {code : 500 , data: null} ;
        }
    })
    return result ;
}

router.get('/',async (req,res)=>{
    var result = await loadImg();
    switch(result.code){
        case 200 :
            res.status(200).json({status : false,result : "Ok", img : result.data})
            break ;
        case 404 :
            res.status(404).json({status : false,result : "fileNotFound", img : result.data})
            break ;
        case 500 :
            res.status(500).json({status : false,result : "errServer", img : result.data})
            break ;
        default :
            break ;
    }
})



module.exports = router ;