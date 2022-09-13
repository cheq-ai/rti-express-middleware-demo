const axios = require('axios');
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
const url = require('url')


module.exports.middleware = function middleware (req, res, next) {
    res.locals.captchaSrc = `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCH_SITE_KEY}`;
    res.locals.siteKey = process.env.RECAPTCH_SITE_KEY;
    res.locals.isInvalid = 'suspicious'
    next();
}


module.exports.verify = function verify(req, res, next) {
        const { captcha } = req.query;
        if(captcha){
            return  axios.post(RECAPTCHA_VERIFY_URL, `secret=${process.env.RECAPTCH_SITE_SECRET}&response=${captcha}`, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(captchaRes => {
                return captchaRes.data.success
            })

        } else {
            return false
        }
}

function getPageFromReferer(referer, res, next) {
    const parseUrl = new url.URL(referer)
    switch (parseUrl.pathname) {
        case '/':
            res.render('index');
            break;
        case '/signup-submit':
            res.render('pass');
            break;
        default: next()
    }
}