import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import Spinner from '../../components/spinner';
import * as Constants from '../../utils/constants';

const History = ({listTransactions, spinnerHistory}) => {

    const list = (listTransactions) => {
        return listTransactions.map((element,i) => {
            return (
                <ListItem
                    key={i}
                    title={Constants.ACCOUNT === element.to ? "Received" : "Sent"}
                    titleStyle={styles.title}
                    subtitle={Constants.ACCOUNT === element.to ? 'From:' + element.hash : 'To:' + element.hash}
                    subtitleStyle={styles.subtitle}
                    leftIcon={Constants.ACCOUNT === element.to ? <SimpleLineIcons name="arrow-down-circle" size={24} color="black" /> : <SimpleLineIcons name="arrow-up-circle" size={24} color="black" /> }
                    bottomDivider
                    rightTitle={element.value === '0' ? '0' : Constants.ACCOUNT === element.to ? '+' + element.value : '-' + element.value}
                    rightTitleStyle={Constants.ACCOUNT === element.to ? styles.receiveColor : styles.sendColor}
                />
            );
        });
    };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>History</Text>
        <ScrollView>
            {!spinnerHistory && list(listTransactions) }
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
        fontSize: 12,
        fontWeight: 'bold',
    },
    subtitle:{  
        fontSize: 10,
        color:'#3A3A3A'
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