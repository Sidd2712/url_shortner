const express=require("express");
const Url=require('../models/Url');
const urlRepository=require('../repository/urlRepository');
const {nanoid}=require('nanoid');
const {saveUrl, getUrlByShortId, incrementCount}=require('../repository/urlRepository');

function isValidUrl(url){
    try{
        newURL(url);
        return true;
    }catch(err){
        return false;
    }
}

// after data validation and senitization
async function shortenUrl(originalUrl){
    try{
        if(!originalUrl){
            throw new Error("URL is required");
        }

        // add http:// if missing
        if(!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')){
            originalUrl = 'http://' + originalUrl;
        }
        if(!isValidUrl(originalUrl)){
            throw new Error("Invalid URL");
        }
        const shortId=nanoid(8); // 8 char unique id
        const urlDoc=await saveUrl(shortId,originalUrl);
        return urlDoc

    }catch(error){
        throw new Error('Error creating short URL: '+error.message);
    }
}

async function redirectUrl(shortId) {
    try {
        const urlDoc = await getUrlByShortId(shortId);
        if (!urlDoc) {
            throw new Error('URL not found');
        }
        console.log(urlDoc)
        await incrementCount(urlDoc);
        return urlDoc.originalUrl;
    } catch (error) {
        throw new Error('Error redirecting URL: ' + error.message);
    }
}

async function shortenUrlHandler(req,res,next){
    try{
        const {url}=req.body;
        if(!url){
            return res.status(400).json({
                error:"Url is required"
            });
        }
        const urlDoc=await shortenUrl(url);
        res.json({
            shortUrl: `http://${req.get('host')}/sid/${urlDoc.shortUrl}`
        });
    }catch(err){
        if(err.message.includes("Invalid Url")){
            return res.status(400).json({
                error:err.message
            });
        }
        next(err);
    }
}

module.exports={shortenUrl, redirectUrl, shortenUrlHandler};