const {sanitizeBody}=require('express-validator');

module.exports.sanitizeInput=(req,res,next)=>{
    if(req.body && typeof req.body.url =='string'){
        req.body.url=req.body.url.trim();
    }
    next();
}