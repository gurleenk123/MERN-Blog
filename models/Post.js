var mongoose=require('mongoose');
var postSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
       
    },
    body:{
        type:String,
        required:true,
        
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true,

    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
  
    
},{timestamps:true});
//post is table name
var postModel=mongoose.model('post',postSchema);
module.exports=postModel;
