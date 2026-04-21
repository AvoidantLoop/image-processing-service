const rateLimit = require("express-rate-limit")


const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:{
        message: "Too many requests, please try again after 15 minutes",
    }


})


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message:{
        message: "Too many login attempts, please try again after 15 minutes",
    }


})

module.exports = {generalLimiter, authLimiter}