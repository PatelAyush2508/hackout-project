require("dotenv").config();
const Web3 = require("web3");
const contractJson = require("../build/contracts/HydrogenCredit.json"); // Truffle build JSON

// Connect to Ganache
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_URL));

// Load account from private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

// Load contract
const contract = new web3.eth.Contract(
  contractJson.abi,
  process.env.CONTRACT_ADDRESS
);

// Function to issue credits
async function issueCredits(to, amount, batchId, metadataHash) {
  const tx = await contract.methods
    .issueCredits(to, amount, batchId, metadataHash)
    .send({ 
      from: account.address, 
      gas: 3000000, 
      gasPrice: '2000000000' // 2 Gwei
    });
  return tx;
}

// Function to transfer credits
async function transferCredits(id, to, amount) {
  const tx = await contract.methods
    .transfer(id, to, amount)
    .send({ 
      from: account.address, 
      gas: 3000000, 
      gasPrice: '2000000000' 
    });
  return tx;
}

// Function to retire credits
async function retireCredits(id, amount, reason) {
  const tx = await contract.methods
    .retire(id, amount, reason)
    .send({ 
      from: account.address, 
      gas: 3000000, 
      gasPrice: '2000000000' 
    });
  return tx;
}

// Function to get credit info
async function getCredit(id) {
  const credit = await contract.methods.credits(id).call();
  return {
    owner: credit.owner,
    amount: credit.amount,
    retired: credit.retired
  };
}

// Export functions
module.exports = { issueCredits, transferCredits, retireCredits, getCredit };



// require("dotenv").config();
// const Web3 = require("web3");
// const contractJson = require("../build/contracts/HydrogenCredit.json"); // Truffle build JSON

// // Connect to Ganache
// const web3 = new Web3(process.env.GANACHE_URL);

// // Load account from private key
// const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
// web3.eth.accounts.wallet.add(account);

// // Load contract
// const contract = new web3.eth.Contract(
//   contractJson.abi,
//   process.env.CONTRACT_ADDRESS
// );

// // --- Issue Credits ---
// async function issueCredits(to, amount, batchId, metadataHash) {
//   const tx = await contract.methods
//     .issueCredits(to, amount, batchId, metadataHash)
//     .send({ from: account.address, gas: 3000000 });
//   return tx;
// }

// // --- Transfer Credits ---
// async function transferCredits(id, to, amount) {
//   const tx = await contract.methods
//     .transferCredit(id, to, amount)
//     .send({ from: account.address, gas: 3000000 });
//   return tx;
// }

// // --- Retire Credits ---
// async function retireCredits(id, amount, reason) {
//   const tx = await contract.methods
//     .retireCredit(id, amount, reason)
//     .send({ from: account.address, gas: 3000000 });
//   return tx;
// }

// // --- Get Credit Info ---
// async function getCredit(id) {
//   const credit = await contract.methods.credits(id).call();
//   return {
//     owner: credit.owner,
//     amount: credit.amount,
//     retired: credit.retired,
//     batchId: credit.batchId,
//     metadataHash: credit.metadataHash
//   };
// }

// // Export functions
// module.exports = { issueCredits, transferCredits, retireCredits, getCredit };
