const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mneumonic = 'breeze jar acid range various salon another ribbon juice pen undo tragic';
const network = 'https://rinkeby.infura.io/DXw2rqHt6I8SobHyuro6';

const provider = new HDWalletProvider(mneumonic, network);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const mainAccount = accounts[0];

  console.log('Attempting to deploy from account', mainAccount);

  const abi = JSON.parse(interface);

  const { options: { address } } = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ['Hi there'] })
    .send({ gas: '1000000', from: mainAccount });

  console.log('Contract deployed to', address);
};

deploy();
