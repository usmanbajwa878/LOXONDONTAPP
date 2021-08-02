import React from 'react';
import {View,Text} from 'react-native';
import styles from './DashBoardScreen.styles';


const DashBoardScreen  = props =>{
    return (
        <View style={styles.container}>
            <Text>Hello from DashBoard</Text>
        </View>
    )
};
export default DashBoardScreen;