const jwt=require('jsonwebtoken');
exports.valid=(req,res,next)=>
{

    const authheader=req.headers.authorization;
    const token=authheader.split('Bearer ')[1];
    //console.log(token);
    try
    {
        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    catch(error){
        //console.log(error)
        return res.status(401).json({errors: [{msg:'Token error'}] })
    }
    
}

