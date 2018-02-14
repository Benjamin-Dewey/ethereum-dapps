const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const contract = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  // Get a an account
  accounts = await web3.eth.getAccounts();
  const mainAccount = accounts[0];

  // deploy the contract
  const abi = JSON.parse(contract.interface);
  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: contract.bytecode })
    .send({ from: mainAccount, gas: '1000000' });

  lottery.setProvider(provider);
});

describe('lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });
});
