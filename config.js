module.exports = {
	apiKey: process.env.CHEQ_API_KEY,
	tagHash: process.env.CHEQ_TAG_HASH,
	callback: function (req, res, next){
		res.redirect('https://www.youtube.com/watch?v=LButXcZ57pc')
	},
	redirectUrl: 'https://invalid-user.com',
	apiEndpoint: 'https://rti-us-east-1.cheqzone.com',
	trustedIPHeader: 'Client-Ip',
	mode: 'blocking',
	timeout: 1000,
	URIExclusion: ['/about', /\/add_to_cart.*item=698/],
	threatTypesCodes: {
		blockRedirect: [2, 3, 6, 7, 9],
		captcha: [4, 5, 13]
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