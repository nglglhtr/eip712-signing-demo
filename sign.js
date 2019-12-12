var Buffer = require('buffer/').Buffer 
var ethUtils = require('ethereumjs-util')
var sigUtils = require('eth-sig-util')
const domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "contract", type: "address" }
];
const tokenTransferOrder = [
  { name: "spender", type: "address" },
  { name: "tokenIdOrAmount", type: "uint256" },
  { name: "data", type: "bytes32" },
  { name: "expiration", type: "uint256" }
];
const token1 = '0xC52BD2A7fefDdb48E39e45DC4A003A03c15A2315'
const amount1 = 1
const token2 = '0x8d7E5E349DDB3dB4c24B80849809602932C8EE00'
const amount2 = 2
const orderId = '0x565fc8c006383053139846222b6b0aebc1182ba073b2455938a86e9753bfb478'
const spender = '0x6dDBb4f17e59bb552240274fdC58de8802A4Fa71'
const privateKey = '0x7A6B65B8B79D3C650DE2B32BCEA4B245F7CCF3DD687D48EE738F66BF774F6C31'

const orderData = Buffer.concat([
  ethUtils.toBuffer(orderId),
  ethUtils.toBuffer(token2),
  ethUtils.setLengthLeft(amount2, 32)
]);
const orderDataHash1 = ethUtils.keccak256(orderData);
const orderDataHash = '0x' + orderDataHash1.toString('hex');

const expiration = 0;
const domainData = {
  name: "Matic Netwoork",
  version: "1",
  chainId: 15001,
  verifyingContract: token1
};

var message = {
  spender: spender,
  tokenIdOrAmount: amount1,
  data: orderDataHash,
  expiration: expiration
};
const typedDataObject = {
  types: {
    EIP712Domain: domain,
    TokenTransferOrder: tokenTransferOrder
  },
  domain: domainData,
  primaryType: "TokenTransferOrder",
  message: message
}

const sig = sigUtils.signTypedData(ethUtils.toBuffer(privateKey), {
  data: typedDataObject
})

console.log("result from lib", sig);

window.addEventListener('load', function() {

  // force the user to unlock their MetaMask
  if (web3.eth.accounts[0] == null) {
    alert("Please unlock MetaMask first");
    // Trigger login request with MetaMask
    web3.currentProvider.enable().catch(alert)
  }

  var signBtn = document.getElementById("signBtn");
  signBtn.onclick = function(e) {
    if (web3.eth.accounts[0] == null) {
      return;
    }
  const chainId = parseInt(web3.version.network, 10);

  const signer = web3.eth.accounts[0];

  web3.currentProvider.sendAsync(
    {
      method: "eth_signTypedData_v3",
      params: [signer, JSON.stringify(typedDataObject)],
      from: signer
    }, 
    function(err, result) {
      if (err || result.error) {
        return console.error(result);
      }
      console.log("result from metamask: ")
      console.log(result.result)
    }
  );};
})