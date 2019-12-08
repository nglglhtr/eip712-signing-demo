var Buffer = require('buffer/').Buffer 
var ethUtils = require('ethereumjs-util')

function parseSignature(signature) {
  var r = signature.substring(0, 64);
  var s = signature.substring(64, 128);
  var v = signature.substring(128, 130);

  return {
      r: "0x" + r,
      s: "0x" + s,
      v: parseInt(v, 16)
  }
}

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

    const chainId = parseInt(web3.version.network, 10);

    const token1 = '0xC52BD2A7fefDdb48E39e45DC4A003A03c15A2315'
    const amount1 = 1
    const token2 = '0x8d7E5E349DDB3dB4c24B80849809602932C8EE00'
    const amount2 = 2
    const orderId = '0x561fc8c006383053139846222b6b0aebc1182ba073b2455938a86e9753bfb478'
    const spender = '0x6dDBb4f17e59bb552240274fdC58de8802A4Fa71'

    const orderData = Buffer.concat([
      ethUtils.toBuffer(orderId),
      ethUtils.toBuffer(token2),
      ethUtils.setLengthLeft(amount2, 32)
    ]);
    const orderDataHash = ethUtils.keccak256(orderData);
    console.log (orderDataHash); 

    const expiration = 0;
    const domainData = {
      name: "Matic Network",
      version: "1",
      chainId: chainId,
      verifyingContract: token1
    };

    var message = {
      spender,
      amount1,
      orderDataHash,
      expiration
    };
    
    const data = JSON.stringify({
      types: {
        EIP712Domain: domain,
        TokenTransferOrder: tokenTransferOrder
      },
      domain: domainData,
      primaryType: "TokenTransferOrder",
      message: message
    });

    const signer = web3.eth.accounts[0];

    web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData_v3",
        params: [signer, data],
        from: signer
      }, 
      function(err, result) {
        if (err || result.error) {
          return console.error(result);
        }
        const signature = parseSignature(result.result.substring(2));
        console.log(result.result.substring(2))
        console.log(signature)
      }
    );
  };
})