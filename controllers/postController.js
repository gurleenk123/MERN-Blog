const formidable=require('formidable');
const { v4:uuidv4}=require('uuid');
const fs=require('fs');
const Post =require("../models/Post");
exports.createpost=(req,res,next)=>{
   const form=formidable({multiples:true});
   form.parse(req,(error,fields,files)=>{
   
       const {title,body,description,slug,username,userid}=fields;
  
       const errors=[];
      

    
       if(!title){
           errors.push({msg:'Title is required'});

       }
       if(!body){
           errors.push({msg:'Body is required'});
       }
       if(!description){
           errors.push({msg:'Description is required'});
       }
     
       if(!slug){
        errors.push({msg:'Slug is required'});
        
       }
       else
       {
      
        Post.findOne({slug:slug})
        .exec()
        .then((data)=>{
            if(data){
               
                return res.status(401).json({errors: [{msg:'Enter Unique Slug'}] })
          
            }
        }).catch(err=>{console.log(err)})
        
       }
    
  
       if(Object.keys(files).length===0)
       {
           errors.push({msg:'Image is required'});

       }
     
       else
       {
           const split=files.image.type.split('/');
           //console.log(split);
           const ext=split[1].toLowerCase();
           if(ext === 'jpg' || ext === 'jpeg' || ext === 'png')
           {

               if(errors.length===0)
               {
                   files.image.name =uuidv4() + '.' + ext;
               }
           }
           else
           {
               errors.push({msg:'Please upload jpg, jpeg or png file'});
           }
       }
       
   
     
       
       if(errors.length>0){
           return res.status(400).json({errors})
       }
       else{
        const newpath= __dirname + `/../frontend/public/images/${files.image.name}`;
    
         fs.copyFile(files.image.path,newpath,(err)=>{
             if(err){
                 res.json(err);
             }
             
         })
        const newpost=new Post({
            title,
            body,
            image:files.image.name,
            description,
            slug,
            username:username,
            userid:userid
    
           });
           newpost.save()
           .then(data=>{res.json({message:"Post created successfully",data:data})})
           .catch(err=>{res.json(err)})
    
       }
      
     
   })
}
exports.fetchposts=(req,res,next)=>{
    var id=req.params.id;
    Post.find({userid:id})
    .exec()
    .then(data=>{res.status(200).json({data:data }) })
    .catch(err=>{ res.json({errors: err,msg:error.message}); })
}

exports.allposts=(req,res)=>{
   
   
    Post.find({}).sort({updatedAt:-1})
    .then(data=>{res.status(200).json({resp:data}) })
    .catch(err=>{res.json({errors: err,msg:err.message});})
}

exports.deletepost=(req,res)=>{
    var id=req.params.id;
   
    Post.findByIdAndRemove(id)
    .then(doc=>{
        res.status(201).json({
            message:"Post successfully deleted",
            

        });
    })
    .catch(err=>{
        res.json(err);
    })
}
exports.showpost=(req,res)=>{
    var slug=req.params.slug;
    Post.find({slug:slug})
    .exec()
    .then(data=>{res.status(200).json({data:data }) })
    .catch(err=>{ res.json({errors: err,msg:error.message}); })

}