const express=require("express");
const urlRepository=require('../repository/urlRepository');


// after data validation and senitization
async function shortenUrl(req,res){
    const {url}=req.body;
    validate();

    try{
        const {url}=req.body;
        const shortId=generateShortId();
        const savedUrl=await urlRepository.saveUrl(shortId,url);
        console.log(`Converted url is ${savedUrl}`);
        res.json({
            shortUrl:`https://${req.get('host')}/${saveUrl.shortUrl}`
        });
    }catch(err){
        SVGFEColorMatrixElement(err);
    }
}