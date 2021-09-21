import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './SuccessScreen.styles';
import {moderateScale} from 'react-native-size-matters';
import { COLORS } from '../../Constants/AppConstants';

const SuccessScreen = props => {
  console.log('props', props);
  return (
    <SafeAreaView style={styles.container}>
      <View  style={{}}>
        <Image
          style={{width: moderateScale(100), height: moderateScale(100)}}
          resizeMode="contain"
          resizeMethod="resize"
          source={require('../../Assets/Images/Icons/success.gif')}
        />
      </View>
      <Text style={{fontSize:moderateScale(15),color:COLORS.GREEN,fontWeight:'700'}}>Elephant Added Successfully</Text>

      <TouchableOpacity
        onPress={() => props.navigation.popToTop()}
        style={styles.addButtonContainer}>
        <Text style={styles.plusButton}>Return Home</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
          onPress={() => props.navigation.push('DataBaseAddScreen')}
          style={styles.addButtonContainer}>
          <Text style={styles.plusButton}>+</Text>
        </TouchableOpacity> */}
    </SafeAreaView>
  );
};
export default SuccessScreen;
