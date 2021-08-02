import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import styles from './Header.styles';

const Header = ({
  showLeftButton = null,
  showRightButton = null,
  showText = null,
  style = null,
  leftButtonImage = null,
  RightButtonImage = null,
  headerText = null,
  sideMenu = null,
  onPressRightButton = null,
  onPressLeftButton = null,
  showLeftandRight = null,
}) => {
  // const {
  //   showLeftButton,
  //   showRightButton,
  //   showText,
  //   style,
  //   leftButtonImage,
  //   RightButtonImage,
  //   headerText,
  // } = props;
  return (
    <View style={[styles.headerContainer, style]}>
      {showLeftButton && (
        <TouchableOpacity
          onPress={onPressLeftButton}
          style={styles.headerLeftButton}>
          <Image source={leftButtonImage} />
        </TouchableOpacity>
      )}
      {showText && (
        <View style={styles.headerCenterView}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
      )}

      {showLeftandRight && (
        <View>
          <TouchableOpacity
            onPress={onPressLeftButton}
            style={styles.headerLeftButton}>
            <Image
              resizeMode="contain"
              style={{height: 20, width: 20}}
              source={leftButtonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressRightButton}
            style={styles.headerRightButton}>
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                borderWidth: 1,
              }}
              height={moderateScale(20)}
              resizeMode="contain"
              source={require('../../Assets/Images/Icons/sidemenu.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      {showRightButton && sideMenu && (
        <View style={{height:moderateScale(50),width:'100%',justifyContent:"center",alignItems:"flex-end"}}>
          <TouchableOpacity
            onPress={onPressRightButton}
            style={styles.headerRightButton}>
            <Image
              //  height={moderateScale(40)}
              // resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
              source={require('../../Assets/Images/Icons/sidemenu.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Header;
