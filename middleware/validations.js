const { check } = require('express-validator');
const User =require("../models/User");
exports.regvalidations=[
    check('name',"UserName is required").trim().isLength({min:1}),
    check('email',"Not a valid email address").isEmail(),
    check('email').custom(email=>{
        return User.findOne({email:email}).then(data=>{
            if(data)
            {
                return Promise.reject("Email is already in use");
            }

        })
    }),
    check('password',"Password Must be of 5 characters").trim().isLength({min:5}),

    check('cpassword').custom((value,{req})=>{
        if(req.body.cpassword !==req.body.password){
            throw new Error('password not matched');

        }
        else{
            return true
        }
    })
    
];
exports.loginvalid=[check('email',"Email is required").trim().isLength({min:1}),
check('password',"Password is required").trim().isLength({min:1}),

];

