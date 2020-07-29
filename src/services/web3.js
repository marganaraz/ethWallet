const Web3 = require('web3');
import axios from 'axios';
import * as Constants from '../utils/constants';

export const getBalance = async (account) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(Constants.URL_INFURA))
    let response = undefined;

    await web3.eth.getBalance(account, async (err, result) => {
      if (!err) {
        response = await web3.utils.fromWei(result, "ether")
      }
    })

    return response;
  }

export const getTransactionsByAccount = async (account, startBlockNumber, endBlockNumber) => {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/55e0252523354d0b8c735251a6cea9df"))
    
    if (endBlockNumber === null) {
        await web3.eth.getBlockNumber((err, result) => {
            if( err !== null || err !== undefined){
                endBlockNumber = result
            }
        })
    }

    if (startBlockNumber === null) {
      startBlockNumber = endBlockNumber - 5000;
    }

    let transactionsHash = []
    let transactionsBlock = []
    
    for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        await web3.eth.getBlock(i, (err, block) => {
            if( err !== null || err !== undefined){
              for (const item of block.transactions) {
                transactionsBlock.push(item)
              }
            }
        })
    }

    for(const item of transactionsBlock){
        await web3.eth.getTransaction(item, (err, tx) => {
            if( (tx !== undefined && tx !== null) && (err !== null || err !== undefined) && (account === "*" || account === tx.from || account === tx.to)) {
                transactionsHash.push(tx);
            }
        })
    }

    return transactionsHash;
}

export const getTransactionsByAccountEtherScan = async (account, startBlockNumber, endBlockNumber) => {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(Constants.URL_INFURA))
        if (endBlockNumber === null) {
            await web3.eth.getBlockNumber((err, result) => {
                if( err !== null || err !== undefined){
                    endBlockNumber = result
                }
            })
        }
        if (startBlockNumber === null) {
          startBlockNumber = endBlockNumber - 5000;
        }        
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json' 
            },
            url: `http://api.etherscan.io/api?module=account&action=txlistinternal&address=${account}&startblock=${startBlockNumber}&endblock=${endBlockNumber}&sort=asc&apikey=${Constants.KEY_ETHERSCAN}`
        };
    
        let response = await axios(options)
        return response
      } catch (error) {
        console.log(error);
      }
}