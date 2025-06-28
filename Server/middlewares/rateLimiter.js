const rateLimit = require('express-rate-limit');
const { StandardValidation } = require('express-validator/lib/context-items');

const limiter=rateLimit({
    windowMs: 15*60*1000, // 15 mins
    max: 10,
    message:'Too many requests',
    StandardValidation,
    legacyHeaders: false,
});
module.exports=limiter;