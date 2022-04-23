const mongoose = require('mongoose');




const accountModel = require('./model/accountModel');

var abc = async ()=>{
    await mongoose.connect('mongodb://localhost/Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function(){
    
    console.log('connect database');
}).catch(function(err){console.error(`ket noi data that bai  ${err}`)});
await accountModel.findOne({usename : 'manhhung311'}).exec().then((data)=>{
    if(data){
       console.log('đây là data ' +data); 
    }
    if(!data){
        console.log('không có data' + !data)
    }
    
}).catch((err)=>{
    console.log('lỗi '+ err);
})


}


abc();

