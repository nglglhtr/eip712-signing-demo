# EIP712 Signing Demo

## Dependencies
- http-server `npm install -g http-server`
- browserify `npm install -g browserify`

## Compile
> __Note__: Remember to recompile after making changes to sign.js
```
$ browserify sign.js > bundle.js
```

## Run
```
$ http-server
```

## Other details
the params are hardcoded, [here](/sign.js#L45)

### Addresses
| . | address |
|---|---|
|network (rpc)|`https://testnetv3.matic.network`|
| erc20 | `0x8d7E5E349DDB3dB4c24B80849809602932C8EE00` |
| erc721 | `0xC52BD2A7fefDdb48E39e45DC4A003A03c15A2315` | 
| marketplace | `0x6dDBb4f17e59bb552240274fdC58de8802A4Fa71` |

(these are test token contracts with an addition of `mint` public function, deployed directly on testnetv3 - not deposited.)
for code, refer: https://github.com/nglglhtr/asset-swap-tutorial/tree/master/contracts
