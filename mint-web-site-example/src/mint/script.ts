import ItlandNFT from './artifacts/ItlandNFT.json'

let config = {
	rinkebyRpc: "https://rinkeby.infura.io/v3/84653a332a3f4e70b1a46aaea97f0435",
 	rinkeby: "rinkeby",
 	ipfs: [
 	'https://gateway.pinata.cloud/ipfs/QmQp9JzpMZ7ibfgvdARcHhpVA7v2fWgxRNmrEjzBR7EdV8',
 	'https://gateway.pinata.cloud/ipfs/QmfWCUjW3YohZnfzKCrTSVnVzjSAk1MLntF6F2VL7UUn5C',
 	'https://gateway.pinata.cloud/ipfs/QmPSuZDRHn92CoBhSLpj6o67X9EW6wrC9CSMZeVqSH7Agj',
 	'https://gateway.pinata.cloud/ipfs/QmP9Axfbp5nQhi6e2XLAB6A7a3SxRnnMqZxc2Vzo7u4tnU',
	'https://gateway.pinata.cloud/ipfs/QmchY5GBDFoxLoTQk33eAGi33Xet93kKbnwfcSFZJR3NZG',
 	],
 	chainId: 4,
 	owner: "0x489Df096836A7Df671CAdeC6A2cF7689675C1778",
 	collection: "0x70fbdc0e3b93703be1e4878e17fbcba6ac2443ed"
}

async function getWeb3Accounts(web3) {
    return await web3.eth.getAccounts();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomItem() {
  let idx = getRandomInt(10);
  if (idx <= 1) { // 0, 1 - 10%
    return idx;
  }
  if (idx <= 3) { // 2 ,3 -> 2 - 20%
    return 2;
  }
  if (idx <= 6) { // 4,5,6 -> 3 - 30%
    return 3;
  }
  return 4; // 7,8,9 -> 4 - 30%
}

export async function mintNewToken(collection, web3) {
    console.log("is web3 " + web3);
    const [creator] = await getWeb3Accounts(web3);
	console.log("creator is", creator);
	if (!collection) {
	    collection = config.collection
	}
	console.log("collection is", collection);
    let nftCollecton = new web3.eth.Contract(ItlandNFT.abi, collection);
    let idx = getRandomItem()
    let tokenURI = config.ipfs[idx]
    console.log("tokenURI: " + tokenURI)
    let value = '0'
    if (creator != config.owner) {
        value = '10000000000000000' // 0.01 eth
    }
    try {
        let tx = nftCollecton.methods.mint(tokenURI).send({
            value: value,
            from: creator,
            gas: 1500000,
            gasPrice: '5000000000'
        });
//         console.log("TX: ", tx);
        return "https://rinkeby.rarible.com/collection/" + collection + "/items";
    }catch (e) {
        console.log(e.message)
        return "ERROR";
    }
}
