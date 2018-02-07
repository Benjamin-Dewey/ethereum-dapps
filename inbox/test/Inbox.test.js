const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const contract = require('../compile');

let accounts;
let inbox;
const initialMessage = 'Hi there!';

beforeEach(async () => {
  // Get a list of all acounts
  accounts = await web3.eth.getAccounts();

  const abi = JSON.parse(contract.interface);

  // Use an account to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: contract.bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
