const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const accountAdminModel = require('../../model/accAdminModel');
const checkLoginAcc = require('../admin/checkLoginAdmin');
router.use(express.json());



router.get('/',checkLoginAcc,(req,res)=>{
    let token = req.headers.cookie.slice('token='.length)||null ;
    let decode = jwt.verify(token,'N$1*42');
    accountAdminModel.findById(decode._id,(err,data)=> {
        if(data){
            Object.assign(data,{token: "" });
            data.save();
            res.render('loginAdmin');
        }
    })
})





module.exports = router ;