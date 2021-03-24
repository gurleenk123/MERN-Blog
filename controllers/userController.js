const User =require("../models/User");
const {validationResult}=require('express-validator');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signup= (req,res,next)=>{
    
   const {password}=req.body;
   const errors=validationResult(req);
   const hash=bcrypt.hashSync(password,11);
 
   if(!errors.isEmpty())
   {
       return res.status(400).json({errors: errors.array()});
   }
   else
   {
       const newuser=new User({
        uname:req.body.name,
        email:req.body.email,
        password:hash,

       });
       newuser.save()
       .then(data=>{res.json({message:"User registered successfully",data:data})})
       .catch(err=>{res.json(err)})

   }  
}
exports.login=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
   {
       return res.status(400).json({errors: errors.array()});
   }
   else{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
         res.status(400).json({
            errors:[{ msg : "Enter your registered email"}],
         })
            
        }
        else
        {
         bcrypt.compare(req.body.password, user[0].password, function(err, result)
          {
            if(err)
            {
             res.status(400).json({
                errors:[{ msg : "password error"}],             })
 
            }
           else if(result)
            {
                
            
                var token=jwt.sign
                (
                    { user:user, userId:user._id},
                    
                    process.env.SECRET_KEY,
                     { expiresIn:"2d"}
                );
                res.status(200).json({
                    message:"Login Successfully",
                    token:token
                });
 
            }
            
            else
            {
                
             res.status(400).json({
                errors:[{ msg : "Enter correct password"}],
                 
             });
 
            }
            
         });
       
        }
        
    })
    .catch(err=>{
        res.json({err:err})
 
    })
   
    
}   
}

