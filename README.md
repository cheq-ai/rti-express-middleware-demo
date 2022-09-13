# CHEQ's Real Time Interception Middleware Demo

The following repository demonstrate a simple demo which utilize CHEQ's RTI solution.

In order to run the demo you'll need to create a couple environment variables.

```code

    CHEQ_API_KEY
    CHEQ_TAG_HASH
    RECAPTCH_SITE_KEY - see https://www.google.com/recaptcha
    RECAPTCH_SITE_SECRET - see https://www.google.com/recaptcha
    
```
Then run

````bash
$ export CHEQ_API_KEY=abcdddd-dddd3-492f-9417-66a1f22b4daa 
$ export CHEQ_TAG_HASH=000000000000 
$ export RECAPTCH_SITE_KEY=6LcHlssfYilk689JJ 
$ export RECAPTCH_SITE_SECRET=6LcHlssfYilk689JJ 
$ node server.js
````

And visit  `localhost:8080`

**Notes:**
The configuration file can be found at the root directory `config.js`

````js
const recaptcha = require('./helpers/captcha');

module.exports = {
	apiKey: process.env.CHEQ_API_KEY,
	tagHash: process.env.CHEQ_TAG_HASH,
	callback: recaptcha.middleware,
	redirectUrl: 'https://invalid-user.com',
	apiEndpoint: 'https://rti-us-east-1.cheqzone.com',
	trustedIPHeader: 'Client-Ip',
	mode: 'blocking',
	timeout: 1000,
	URIExclusion: ['/about', /\/add_to_cart.*item=698/],
	threatTypesCodes: {
		blockRedirect: [2, 3, 6, 7, 9, 13],
		captcha: [4, 5]
	},
	getResourceType: function(req) {
		if(req.method === 'POST') {
			return 'application/json'
		} else if(req.method === 'GET'){
			return 'text/html'
		}

	},
	getChannel: function getChannel(req) {
		return req.query.channel
	},
	getJa3: function getJa3(req) {
		return req.query.ja3
	}

}

````
