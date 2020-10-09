import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import * as Constants from '../../utils/constants';

const HeaderComponent = () => {
  return (
    <>
    <Header
        leftComponent={<FontAwesome5 name="ethereum" size={35} color="white"/>}
        centerComponent={{ text: 'ETH WALLET', style: styles.text}}
        containerStyle={styles.header}
    />
    <Text style={{textAlign: 'center'}}>Account: {Constants.ADDRESS_ACCOUNT}</Text>
    </>
  )

}

export default HeaderComponent;

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#3375BB',
    },
    text: {
      color: '#fff'
    }
  });