const express = require('express');
const app = express();
const port = 8080;
const {rti, eventsTypes} = require('./cheq-meddlewares')
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const recaptcha = require('./helpers/captcha');



const rtiMiddleware  = rti({
	apiKey: process.env.CHEQ_API_KEY,
	tagHash: process.env.CHEQ_TAG_HASH,
	callback: recaptcha.middleware,
	redirectUrl: 'https://invalid-user.com'
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookiesParser());
app.set('view engine', 'ejs');




app.get('/', rtiMiddleware(eventsTypes.PAGE_LOAD), (req, res) => {
	res.render('index', {
		captchaSrc: res.locals.captchaSrc || '',
		siteKey: res.locals.siteKey || '',
		reason: res.locals.reason || '',

	});
});


app.get('/signup-submit', rtiMiddleware(eventsTypes.FORM_SUBMISSION), function(req, res) {
	recaptcha.verify(req, res)
		.then(isValidCaptcha => {
			if(isValidCaptcha) {
				res.render('pass');
			} else {
				res.status(403).send('Visitor is invalid, session blocked!');
			}
		})


});




app.listen(port);
console.log(`Server is listening on port ${port}`);
