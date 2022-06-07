const axios = require('axios');
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
const url = require('url')


module.exports.middleware = function middleware (req, res, next) {
    res.render('captcha', {
        captchaSrc: `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCH_SITE_KEY}`,
        siteKey: process.env.RECAPTCH_SITE_KEY
    })
}


module.exports.verify = function verify(req, res, next) {
        const { token } = req.query;
        if(token){
            axios.post(RECAPTCHA_VERIFY_URL, `secret=${process.env.RECAPTCH_SITE_SECRET}&response=${token}`, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(captchaRes => {
                if(captchaRes.data.success) {
                    const page = getPageFromReferer(req.headers.referer)
                    res.render(page)
                } else {
                    res.sendStatus(403)
                }

            })

        } else {
            res.send('invalid captcha token').status(403)
        }
}

function getPageFromReferer(referer) {
    const parseUrl = new url.URL(referer)
    switch (parseUrl.pathname) {
        case '/': return 'form'
        case 'signup-submit': return 'pass'
    }
    // if(parseUrl.pathname === '/') return 'form'

}