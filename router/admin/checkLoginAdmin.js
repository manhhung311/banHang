const express = require('express')
var jwt = require('jsonwebtoken');
const accAdminModel = require('../../model/accAdminModel')


const getUserInfo = async (decode,token)=> {

   let result = await accAdminModel.findById(decode._id).exec().then((data)=>{
        if(data){
            if(data.token == token){
                return 200
            }
            else {
                return 403
            }
        }
        if(!data){
            return 403
        }
    }).catch((err)=> {
        return 500 ;
    })
    return result;
    
}

const checkLoginAcc = async (req,res,next)=> {
    try{
        let token = req.headers.cookie.slice('token='.length)||null ;
        console.log(token);
        let decode = jwt.verify(token,'N$1*42');
        console.log(decode)
        if(decode) {
            let result = await getUserInfo(decode,token);
            console.log(result)
            switch(result) {
                case 200 :
                    next();
                    break ;
                case 500 :
                    res.status(500).json({err: 'error Server'})
                    break ;
                case 403 :
                    res.status(401).json({status : false , result : 'error Token'});
                default :
                     break ;
            }
        }      
    } catch(err) {
        res.status(401).json({status : false , result: 'no Token'})
    }
    
}


module.exports = checkLoginAcc ;