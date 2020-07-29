import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import Spinner from '../../components/spinner';

const Balance = ({balance, spinnerBalance}) => {

  return (
    <View style={styles.container}>
        <View style={styles.icon}>
            <FontAwesome5 name="ethereum" size={100} color="black"/>
        </View>
        {!spinnerBalance && <Text style={styles.text}>{balance ? balance + " ETH" : "Error al obtener balance del usuario"}</Text>}
        {spinnerBalance && <Spinner />}
    </View>
  )

}

export default Balance;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        flex:1,
    },
    text:{
        fontSize: 25,
        marginTop: 50,
        textAlign: 'center',
    },
    icon:{
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
  
