CORTALA <br />A URL shortener microservice project for FreeCodeCamp
----
#### USER STORIES:

- [x] I can POST a URL to ```[project_url]/api/shorturl/new]``` and I will receive a shortened URL in the JSON response.
  Example: ```{ "original_url" : "www.google.com", "short_url" : 1 }```
- [x] If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like ```{"error":"invalid URL"}```
HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
- [x] When I visit the shortened URL, it will redirect me to my original link.

#### SHORT URL CREATION:
* POST [project_url]/api/shorturl/new - https://www.google.com
#### USAGE:
* [[project_url]/api/shorturl/number](/api/shorturl/number)

#### OUTPUT:
* ```https://forum.freecodecamp.com```

#### EXAMPLE:
Check a real working example using this API on the following link.
[https://cortala.glitch.me/example](https://cortala.glitch.me/example)

---
[Yago Estévez](https://twitter.com/yagoestevez)
