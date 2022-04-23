var jwt = require('jsonwebtoken');
const accountModel = require('../model/accountModel')


const getUserInfo = async (decode,token)=> {
    
    let result = await accountModel.findById(decode._id).exec().then((data)=>{
        if(data){
            if(data.token == token){
                return 200
            }
            else{return 403}
            
        }
        if(!data){
            return 403
        }
    }).catch((err)=> {
        return 500 ;
    })
    return result 
    
}

const checkLoginAcc = async (req,res,next)=> {
    try{
        let token = req.headers.authorization.split(' ')[1] ;
        let decode =await jwt.verify(token,'N$1*42');
        if(decode) {
            let result = await getUserInfo(decode,token);
            switch(result) {
                case 200 :
                    next();
                    break ;
                case 500 :
                    res.status(500).json({status :false, result: 'errorServer'})
                    break ;
                case 403 :
                    res.status(401).json({status : false , result : 'errorToken'});
                default :
                     break ;
            }
        }      
    } catch(err) {
        res.status(401).json({status : false , result: 'noToken'})
    }
    
}


module.exports = checkLoginAcc ;