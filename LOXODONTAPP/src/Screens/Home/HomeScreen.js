import React, { useEffect } from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './HomeScreen.styles.js';
import Header from '../../Components/Header';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import { actionGetAllElephants } from '../../Store/Actions/Elephant.js';

const HomeScreen = props => {
  console.log('props', props);

  const dispatch = useDispatch();
  const NetInfo = useNetInfo();

  const getElephantData = async () => {
    try {
      if(NetInfo.isConnected){
        await dispatch(actionGetAllElephants());
      }
    } catch (error) {
      console.log("error",error)
    }
  
    
  };

  useEffect(()=>{
    getElephantData()
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: moderateScale(50),
          marginHorizontal: moderateScale(10),
          marginTop: moderateScale(20),
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
          style={{}}>
          <Image
            style={{width: moderateScale(80), height: moderateScale(45)}}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../Assets/Images/Icons/sidemenu.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.push('DataBaseFormScreen')}
          style={styles.addButtonContainer}>
          <Text style={styles.plusButton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.push('DataBaseScreen')}
          style={styles.searchButtonContainer}>
          <Image
            style={{width: moderateScale(80), height: moderateScale(45)}}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../Assets/Images/Icons/search.png')}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>
            Please Select "Add New Photo" or "Search Database"
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
