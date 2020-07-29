import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const HeaderComponent = () => {
  return (
    <Header
        leftComponent={<FontAwesome5 name="ethereum" size={35} color="white"/>}
        centerComponent={{ text: 'CRYPTO WALLET', style: styles.text}}
        containerStyle={styles.header}
    />
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