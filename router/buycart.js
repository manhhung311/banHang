var express = require('express');
var router = express.Router();
var checkLogin = require('./checkLoginAcc');
var productModel = require('../model/product');
var accountModel = require('../model/accountModel');
var salesModel = require('../model/salesModel');
var jwt = require('jsonwebtoken')

var allProduct =async (id)=>{
    var arr = [];
    await id.forEach(async element => {
         await productModel.findById(element).exec().then(async data=>{
             if(data){
               await arr.push(data);
             }
         })       
    });

    

    return arr ;

}
var edit = async (arrAccCart,arrId)=> {
    var arrResult = [];
    var arrResultCart = [];
    for(let i = 0 ; i < arrAccCart.length ; i++){
        for(let j = 0 ; j < arrId.length ; j++){
            if(arrAccCart[i] == arrId[j] ){
                arrResult.push(arrId[j])
            }
            else{
                if(arrResultCart.indexOf(arrAccCart[i]) == -1){
                    arrResultCart.push(arrAccCart[i]);
                }
                
            }
        }
    }
    return {arrResult: arrResult, arrResultCart : arrResultCart} ;
}

var idProductAndAmont = async (arrProduct)=> {
    var arrIdProduct = []; var amount = 0 ;
    arrProduct.forEach(data=>{
        arrIdProduct.push(data._id);
        amount += data.amount ;
    })

    return {arrIdProduct : arrIdProduct , amount : amount};
} 

var addSales = (idAcc, arrIdProduct, amount)=>{
    var today = new Date;
    salesModel.create({
        idProduct : arrIdProduct,
        idAccount : idAcc,
        Data : today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
        amount : amount 
    }) 
}


router.post('/',checkLogin,async (req,res)=>{
    var id = req.body.id || null ;
    console.log(id);
    if(id){
        let token = req.headers.authorization.split(' ')[1]||null ;
        var decode = jwt.verify(token,'N$1*42');

        accountModel.findById(decode._id,async (err,data)=>{
            if(data){
                var product = await allProduct(id);
                var resultIdAndAmount = await  idProductAndAmont(product);
                var cartEdit = await edit(data.cart,id)
                addSales(data._id,cartEdit.arrResult,resultIdAndAmount.amount);
                res.status(200).json({status : true , result : 'Ok'});
                Object.assign(data,{cart : cartEdit.arrResultCart});
                cartEdit.arrResult.forEach(Data=>{
                    data.buyProducts.push(Data);

                })
                data.save();
                res.status(200).json({status : true , result : 'Ok'});
            }
            if(err){
                res.status(500).json({status : false , result : 'errServer'});
            }
        })
    }
    if(!id){
        res.status(403).json({status : false , result : 'noIdProductArr'});
    }
    
    
})



module.exports = router ;
