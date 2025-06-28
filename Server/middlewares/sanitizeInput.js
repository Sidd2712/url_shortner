const {sanitizeBody}=require('express-validator');

module.exports.sanitizeInput=(req,res,next)=>{
    try{
        if(req.body && typeof req.body.url =='string'){
        req.body.url=req.body.url.trim();
    }
    next();
    }catch(error){
        next(error);
    }
}