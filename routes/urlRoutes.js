const express=require("express");
const router=express.Router();
const {shortenUrlHandler, redirectUrl} =require('../service/urlService');

//url shortening endpoint
router.post('/shorten',shortenUrlHandler);

// url redirection endpoint
router.get('/:shortId',async(req,res,next)=>{
    try{
        const originalUrl=await redirectUrl(req.params.shortId);
        res.redirect(originalUrl);
    }catch(error){
        if(error.message === "Url not found"){
            return res.status(404).json({
                error:{
                    message:'short url not found'
                }
            });
        }
        next(error);
    }
})

module.exports=router;