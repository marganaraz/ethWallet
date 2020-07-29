import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Spinner from '../spinner';
import * as Constants from '../../utils/constants';

const History = ({listTransactions, spinnerHistory}) => {

    const list = (listTransactions) => {
        return listTransactions.map((element,i) => {
            return (
                <ListItem
                    key={i}
                    title={Constants.ACCOUNT === element.to ? "Received" : "Sent"}
                    titleStyle={styles.title}
                    subtitle={element.hash}
                    subtitleStyle={styles.subtitle}
                    leftIcon={Constants.ACCOUNT === element.to ? <SimpleLineIcons name="arrow-down-circle" size={24} color="black" /> : <SimpleLineIcons name="arrow-up-circle" size={24} color="black" /> }
                    bottomDivider
                    rightTitle={Constants.ACCOUNT === element.to ? '+' + element.value : '-' + element.value}
                    rightTitleStyle={Constants.ACCOUNT === element.to ? styles.receiveColor : styles.sendColor}
                />
            );
        });
    };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>History</Text>
        <ScrollView>
            {(!spinnerHistory && listTransactions.length !== 0) ? 
                list(listTransactions) : 
                <View style={styles.noDataText}>
                    <Text>No existen transacciones en los ultimos días</Text>
                </View>
            }
            { spinnerHistory && <Spinner/>}
        </ScrollView>
    </SafeAreaView>
  )
}

export default History;

const styles = StyleSheet.create ({
    container: {
        flex:2,
        paddingLeft: 10,
    },
    text:{
        fontSize: 15,
        paddingLeft:5
    },
    title:{
        fontSize: 13,
        fontWeight: 'bold',
    },
    subtitle:{  
        fontSize: 10,
    },
    sendColor:{
        fontSize: 8,
        color:'#9E9E9E'
    },
    receiveColor:{
        fontSize: 8,
        color:'#42BA55'
    },
    noDataText: {
        alignItems: 'center',
    }

  })