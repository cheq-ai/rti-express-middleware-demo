# CHEQ's Real Time Interception Middleware Demo

The following repository demonstrate a simple demo which utilize CHEQ's RTI solution.

In order to run the demo you'll need to create a couple environment variables.

```code

    CHEQ_API_KEY
    CHEQ_TAG_HASH
    RECAPTCH_SITE_KEY - see https://www.google.com/recaptcha
    RECAPTCH_SITE_SECRET - see https://www.google.com/recaptcha
    
```
Once config file have been setup properly, simply run the demo by

````bash
$ export CHEQ_API_KEY=abcdddd-dddd3-492f-9417-66a1f22b4daa 
$ export CHEQ_TAG_HASH=000000000000 
$ export RECAPTCH_SITE_KEY=6LcHlssfYilk689JJ 
$ export RECAPTCH_SITE_SECRET=6LcHlssfYilk689JJ 
$ node server.js
````

And visit  `localhost:8080`

**Notes:**
* The `views/block.ejs` represent a page where an invalid request will reach.
* The `views/form.ejs` represent a page where a valid request will reach.
* The `views/captcha.ejs` represent a suspicious request that is validated by captcha.
