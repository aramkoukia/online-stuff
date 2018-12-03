# Local HTTPS setting:
### To create server.cert and server.key to use https on your localhost
Download openssl from here:
* https://slproweb.com/products/Win32OpenSSL.html


Run the following commands to generate the `server.key` and `server.cert` files (run commapt prompt As Administrator):
```
openssl genrsa -out server.key 2048
openssl req -new -x509 -key server.key -out server.cert -days 3650 -subj /CN=localhost
```

Copy the generated files in the `certs` folder in the root of the `server` folder