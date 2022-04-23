var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended:false});
var product = require('../../model/product');
var category = require('../../model/categoryModel');
const categoryModel = require('../../model/categoryModel');
var checkLogin = require('./checkLoginAdmin');

var storage = multer.diskStorage({
    destination : (req,file,cb)=> {
        cb(null,'media');
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+ '-' + file.originalname)
    }
})

var upload = multer({
    storage : storage
    

}).single("img");


router.get('/',checkLogin,(req,res,next)=>{
    category.find().exec().then(data=>{
        res.render('index',{
            linkCategory : false,
            linkUpload : true,
            linkProduct : false,
            linkEdit : false,
            linkSales : false,
            categoryData : data


        });
    })
})

router.post('/',urlencodedParser,checkLogin,(req,res)=>{
    upload(req,res,(err)=> {
        if(err instanceof multer.MulterError){
            res.status(501).json(err);
            console.log(err)
            console.log("A Multer error occurred when uploading."); 
        }
        else if(err){
            res.status(501).json(err);
            console.log(err)
        }
        else{
            console.log("upload");
            console.log(req.file);
            product.create({
                name : req.body.name ,
                price : req.body.price,
                intro : req.body.intro,
                img : req.file.filename,
                total : req.body.total,
                category : req.body.category
            },(err,item)=>{
                if(err){
                    console.log(err);
                }
                else{
                    categoryModel.findOneAndUpdate(
                        {_id:req.body.category},
                        {$push : {idProduct : item._id}},
                        (err)=>{
                            if(err){
                                consolog(err)
                            }
                            else{
                                console.log('Ok');
                                category.find().exec().then(data=>{
                                res.render('index',{
                                    linkCategory : false,
                                    linkUpload : true,
                                    linkProduct : false,
                                    linkEdit : false,
                                    linkSalse : false,
                                    categoryData : data
                                });
                            })
                            } 
                        })
                }
            })
            

        }

    })
})

module.exports = router ;