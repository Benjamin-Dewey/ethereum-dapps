const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const contract = require('./compile');

const mneumonic = 'breeze jar acid range various salon another ribbon juice pen undo tragic';
const network = 'https://rinkeby.infura.io/DXw2rqHt6I8SobHyuro6';

const provider = new HDWalletProvider(mneumonic, network);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const mainAccount = accounts[0];

  console.log('Attempting to deploy from account', mainAccount);

  const abi = JSON.parse(contract.interface);

  const { options: { address } } = await new web3.eth.Contract(abi)
    .deploy({ data: contract.bytecode })
    .send({ gas: '1000000', from: mainAccount });

  console.log('Contract interface:', contract.interface);
  console.log('Contract deployed to', address);
  // 0xA1cf50F47723FE4969c259085fdccDeACF651476
};

deploy();
