var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({

    uname:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true,
        }
    },
    password:{
        type:String,
        required:true
    },
    
    
},{timestamps:true});
//users is table name
var userModel=mongoose.model('user',userSchema);
module.exports=userModel;
