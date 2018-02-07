const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mneumonic = 'breeze jar acid range various salon another ribbon juice pen undo tragic';
const network = 'https://rinkeby.infura.io/DXw2rqHt6I8SobHyuro6';

const provider = new HDWalletProvider(mneumonic, network);
const web3 = new Web3(provider);
