const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import * as Constants from '../utils/constants';
import Argy from '../artifacts/Argy.json';

export const getBalance = async (account) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(Constants.INFURA_RINKEBY + Constants.INFURA_PROJECT_ID))
  let response = undefined;

  await web3.eth.getBalance(account, async (err, result) => {
    if (!err) {
      response = await web3.utils.fromWei(result, "ether")
    }
  })

  return response;
}

export const erc20BalanceOf = async (account, erc20Address) => {

  const web3 = new Web3(new Web3.providers.HttpProvider(Constants.INFURA_RINKEBY + Constants.INFURA_PROJECT_ID))
  const erc20 = new web3.eth.Contract(Argy.abi, erc20Address);

  let response = undefined; 

  await erc20.methods.balanceOf(account).call()
  .then((result) => {
    response = web3.utils.fromWei(result, "ether")
  })
  .catch((err) => {
    console.error(err);
  })

  return response;
}

export const erc20Transfer = async (fromAccount, toAccount, fromAmount) => {
  
  // Instancia eñ web3
  const web3 = new Web3(new Web3.providers.HttpProvider(Constants.INFURA_RINKEBY + Constants.INFURA_PROJECT_ID))

  // Instancia el contrato
  const peso = new web3.eth.Contract(Argy.abi, Constants.ARGY_ADDRESS);

  // Formateo la cantidad
  const _fromAmount = web3.utils.toWei(fromAmount, 'ether');

  let _result = false;
  let _hash = ''; 

  // Clave privada
  var key = new Buffer(Constants.PRIVATE_KEY, 'hex');

  // TODO: Tengo que mejorar esto!!
  const gasPrice = 20000000000; //web3.eth.gasPrice;
  const gasPriceHex = web3.utils.toHex(gasPrice);
  const gasLimitHex = web3.utils.toHex(3000000);
  const nonce = await web3.eth.getTransactionCount(fromAccount);

  var tra = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      to: Constants.ARGY_ADDRESS,
      data: peso.methods.transfer(toAccount, _fromAmount).encodeABI(),
      value: "0x00",
      from: fromAccount
  };

  // Armo la transacion
  var tx = new Tx(tra, { 'chain': Constants.CHAIN });

  // La firmo
  tx.sign(key);

  // La serializo
  var stx = tx.serialize();

  // La envio!
  await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
    if (err) { 
      console.warn("Error en web3.eth.sendSignedTransaction: " + err); 
    }
    else {
      console.log('tx: ' + hash);
      _result = true;
      _hash = hash;
    }
  });
  
  return { result: _result, hash: _hash };
}

export const erc20TransferEvent = async (account, erc20Address, hash, blockNumber) => {

  const web3 = new Web3(new Web3.providers.HttpProvider(Constants.INFURA_RINKEBY + process.env.INFURA_PROJECT_ID))
  const peso = new web3.eth.Contract(Peso.abi, erc20Address);

  let response = undefined; 
  
  await peso.getPastEvents('Transfer', {
    filter: { to: account },
    fromBlock: blockNumber,
    toBlock: blockNumber,
  }, function(error, events)
  { 
    response = web3.utils.fromWei(events[0].returnValues.value, "ether")
  });

  return response;
}

export const erc20Mint = async (account, fromAmount) => {

  // Instancia eñ web3
  const web3 = new Web3(new Web3.providers.HttpProvider(Constants.INFURA_RINKEBY + process.env.INFURA_PROJECT_ID))

  // Instancia el contrato
  const peso = new web3.eth.Contract(Peso.abi, Constants.PESO_ADDRESS);

  // Formateo la cantidad
  const _fromAmount = web3.utils.toWei(fromAmount, 'ether');

  let _result = false;
  let _hash = ''; 

  // Clave privada
  var key = new Buffer(process.env.PRIVATE_KEY, 'hex');

  // TODO: Tengo que mejorar esto!!
  const gasPrice = 20000000000; //web3.eth.gasPrice;
  const gasPriceHex = web3.utils.toHex(gasPrice);
  const gasLimitHex = web3.utils.toHex(3000000);
  const nonce = await web3.eth.getTransactionCount(account);

  var tra = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      to: Constants.PESO_ADDRESS,
      data: peso.methods.mint(_fromAmount).encodeABI(),
      value: "0x00",
      from: account
  };

  // Armo la transacion
  var tx = new Tx(tra, { 'chain': Constants.CHAIN });

  // La firmo
  tx.sign(key);

  // La serializo
  var stx = tx.serialize();

  // La envio!
  await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
    if (err) { 
      console.warn("Error en web3.eth.sendSignedTransaction: " + err); 
    }
    else {
      console.log('tx: ' + hash);
      _result = true;
      _hash = hash;
    }
  });
  
  return { result: _result, hash: _hash };
}

export const erc20Burn = async (account, toAmount) => {
  
  // Instancia eñ web3
  const web3 = new Web3(new Web3.providers.HttpProvider(Constants.INFURA_RINKEBY + process.env.INFURA_PROJECT_ID))

  // Instancia el contrato
  const peso = new web3.eth.Contract(Peso.abi, Constants.PESO_ADDRESS);

  // Formateo la cantidad
  const _toAmount = web3.utils.toWei(toAmount, 'ether');

  let _result = false;
  let _hash = ''; 

  // Clave privada
  var key = new Buffer(process.env.PRIVATE_KEY, 'hex');

  // TODO: Tengo que mejorar esto!!
  const gasPrice = 20000000000; //web3.eth.gasPrice;
  const gasPriceHex = web3.utils.toHex(gasPrice);
  const gasLimitHex = web3.utils.toHex(3000000);
  const nonce = await web3.eth.getTransactionCount(account);

  var tra = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      to: Constants.PESO_ADDRESS,
      data: peso.methods.burn(_toAmount).encodeABI(),
      value: "0x00",
      from: account
  };

  // Armo la transacion
  var tx = new Tx(tra, { 'chain': Constants.CHAIN });

  // La firmo
  tx.sign(key);

  // La serializo
  var stx = tx.serialize();

  // La envio!
  await web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
    if (err) { 
      console.warn("Error en web3.eth.sendSignedTransaction: " + err); 
    }
    else {
      console.log('tx: ' + hash);
      _result = true;
      _hash = hash;
    }
  });
  
  return { result: _result, hash: _hash };
}