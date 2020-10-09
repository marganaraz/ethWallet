import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, TextInput, Text, Alert } from 'react-native';
import '../global';
import Header from './screens/Header';
import Balance from './screens/Balance';
import { getBalance, erc20BalanceOf, erc20Transfer } from './services/web3'
import * as Constants from './utils/constants';


const App = () => {
  const [balance, setBalance] = useState(undefined)
  const [argyBalance, setArgyBalance] = useState(undefined)
  const [spinnerBalance, setSpinnerBalance] = useState(true)
  const [toAccount, setToAccount] = useState('0x8868f4E40773ecFFfbE78Aa3537e9f4c91221241');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    (async () => {
      await getBalanceByAccount()
    })();
  }, [])

  const getBalanceByAccount = async () => {
    let ethBalance = await getBalance(Constants.ADDRESS_ACCOUNT)
    setBalance(ethBalance)
    
    let erc20Balance = await erc20BalanceOf(Constants.ADDRESS_ACCOUNT, Constants.ARGY_ADDRESS)
    setArgyBalance(erc20Balance)

    setSpinnerBalance(false)
  }

  const transferERC20 = async () => {
        
    let erc20TransferResult = await erc20Transfer(Constants.ADDRESS_ACCOUNT, toAccount, amount);
    
    if(erc20TransferResult.result) Alert.alert('Se completo la transferencia a ' + toAccount.substr(0, 4) + '...' + toAccount.substr(toAccount.length - 4, 4) + ' por ARGY ' + amount);
    else Alert.alert('Se produjo un error inesperado.');

    let erc20Balance = await erc20BalanceOf(Constants.ADDRESS_ACCOUNT, Constants.ARGY_ADDRESS);
    setArgyBalance(erc20Balance);
  }

  return (
    <View style={styles.container}>
      <Header/>
      <Balance balance={balance} spinnerBalance={spinnerBalance} icon={'ethereum'} token={'ETH'}/>
      <Balance balance={argyBalance} spinnerBalance={spinnerBalance} icon={'gem'} token={'ARGY'}/>
      <View style={{flex: 1, padding: 20}}>
        <Text style={styles.text}>Transferir Token ERC20</Text>
        <TextInput 
          value={toAccount}
          placeholder="ETH Address"
          onChangeText={toAccount => setToAccount(toAccount)}
          style={{
            borderWidth: 2,  // size/width of the border
            borderColor: 'lightgrey',  // color of the border
            paddingLeft: 10,
            height: 40,
            marginBottom: 10,
            marginTop: 10
          }}
        />
        <TextInput 
          value={amount}
          placeholder="Amount"
          onChangeText={amount => setAmount(amount)}
          style={{
            borderWidth: 2,  // size/width of the border
            borderColor: 'lightgrey',  // color of the border
            paddingLeft: 10,
            height: 40,
            marginBottom: 10
          }}
        />
        <Button onPress={transferERC20} title="Transferir" />
      </View>
    </View>
  )

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text:{
    fontSize: 25,
    textAlign: 'center'
  }
});
