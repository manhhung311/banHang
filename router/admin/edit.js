const express = require('express');
const router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended:false});
var checkLogin = require('./checkLoginAdmin');
var categoryModel = require('../../model/categoryModel');
var product = require('../../model/product');


router.get('/:id',checkLogin,(req,res)=> {
    var id = req.params.id ;
    if(id){
        product.findById(id,(err,data)=> {
            if(data){
                categoryModel.find().exec().then(dataCategory=>{
                    if(dataCategory){
                        res.render('index',{
                            linkCategory : false,
                            linkUpload : false,
                            linkProduct : false,
                            linkEdit : true,
                            linkSales : false,
                            product : data,
                            categoryData : dataCategory
                        });
                    }
                })
            }
        })
    }

});


router.post('/',urlencodedParser,checkLogin,(req,res)=> {
    var id = req.body.id ;
    var name = req.body.name ;
    var price = req.body.price ;
    var intro = req.body.intro ;
    var total = require.body.total ;
    var idCategory = req.body.category ;
    product.findById(id,(err,data)=> {
        if(data){
            if(data.name != name || data.price != price||
                data.intro != intro|| data.total != total||
                data.category != idCategory) {
                    categoryModel.findById(idCategory,(err,Data)=> {
                        if(data){
                        Data.idProduct.push(data._id);
                        Data.save();
                        }
                        if(err){
                            res.status(500).json({status: false , result : 'errServer'});
                        }
                        
                    })
                    categoryModel.findById(data.category,(err, cateData)=> {
                        if(cateData){
                            Object.assign(data,
                                {name : name},
                                {price : price},
                                {intro : intro},
                                {total : total},
                                {category : idCategory}
                            );
                            data.save();
                            if(idCategory != cateData._id) {
                                Object.assign(cateData , 
                                {idProduct : cateData.idProduct.splice(indexOf(data._id),1)});
                                cateData.save();
                            }
                            
        
                        }
                        if(err){
                            res.status(500).json({status: false , result : 'errServer'});
                        }
        
        
                    })
                    res.render('index',{

                    })

                }
            
        }
    })
})


module.exports = router ;