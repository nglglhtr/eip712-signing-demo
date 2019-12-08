# EIP712 Signing Demo

## dependencies
- http-server `npm install -g http-server`
- browserify `npm install -g browserify`
- ethereumjs-util `npm install --save ethereumjs-util`
- Buffer `npm install --save buffer`

## usage
in root, run 
```
$ http-server
```

## problem
ideally, the signature generated (which is currently logged in browser console) should differ for changing message struct params in the EIP712 typed data, or changing orderId - for some reason, i keep getting the same signature