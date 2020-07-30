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
          startBlockNumber = endBlockNumber - 30000;
        }        
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json' 
            },
            url: `http://api.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=${startBlockNumber}&endblock=${endBlockNumber}&sort=asc&apikey=${Constants.KEY_ETHERSCAN}`
        };
    
        let response = await axios(options)
        return response
      } catch (error) {
        return error;
      }
}