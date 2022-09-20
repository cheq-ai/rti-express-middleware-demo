const express = require('express');
const app = express();
const port = 8080;
const {rti, eventsTypes} = require('@cheq.ai/cheq-middlewares')
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require('./config');



const rtiMiddleware  = rti(config);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookiesParser());
app.set('view engine', 'ejs');




app.get('/', rtiMiddleware(eventsTypes.PAGE_LOAD), (req, res) => {
	res.render('index', {
		captchaSrc: res.locals.captchaSrc || '',
		siteKey: res.locals.siteKey || '',
		isInvalid: res.locals.isInvalid || 'False',
		threatTypeCode: res.locals.threatTypeCode || '0'


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
