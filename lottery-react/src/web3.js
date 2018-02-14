import Web3 from 'web3';

// create an instance of web3 and steal the provider from Metamask's injected web3
const web3 = new Web3(window.web3.currentProvider);

export default web3;
