# Network Agnostic Transactions Demo

- based on MetaTx standard by Biconomy: https://github.com/bcnmy/metatx-standard
- Draft doc for walkthrough: https://www.notion.so/maticnetwork/Network-Agnostic-Transactions-Tutorial-UPDATED-0b39d92f6007440faf34d365e866923c
- a walkthrough for the concept was presented in ETHOnline here: https://youtu.be/5tKzMcflOcY?t=1433 (the repo used there is a more simpler version: https://github.com/nglglhtr/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

## Demo

[![Watch the video](https://img.youtube.com/vi/ETvnnZGQDDc/2.jpg)](https://youtu.be/ETvnnZGQDDc)

## Dependencies
```bash
$ npm i
```

## Run simple relayer
> __Note__: Remember to add PRIVATE_KEY in .env file inside `server`

```bash
$ source server/.env
$ node server/index
```

## Compile
> __Note__: Remember to recompile after making changes to sign.js
```
$ browserify sign.js > bundle.js
```

## Run client & interact
```
$ http-server
```

