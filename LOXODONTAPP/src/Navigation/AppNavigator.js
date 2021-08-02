import React from 'react';
import {
  Image,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoginScreen from '../Screens/Login/LoginScreen';
import ContactUsScreen from '../Screens/ContactUs/ContactUs';
import GuideScreen from '../Screens/Guide/GuideScreen';
import DashBoardScreen from '../Screens/DashBoard/DashBoardScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import SearchScreen from '../Screens/Search/SearchScreen';
import IdentificationScreen from '../Screens/Identification/IdentificationScreen';
import DataBaseScreen from '../Screens/DataBaseScreen/DataBaseScreen';
import AddElephantScreen from '../Screens/AddElephant/AddElephantScreen';
import ForgetPasswordScreen from '../Screens/ForgetPassword';
import DataBaseAddScreen from '../Screens/DataBaseAdd/DataBaseAddScreen';
import SelectedElephantScreen from '../Screens/SelectedElephant/SelectedElephantScreen';
import SuccessScreen from '../Screens/Success/SuccessScreen';
import DataBaseFormScreen from '../Screens/DatabaseForm/DataBaseFormScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {COLORS} from '../Constants/AppConstants';
// import * as authActions from '../Store/Actions/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import { actionLogout } from '../Store/Actions/Auth';

const defaultNavOptions = {
  headerStyles: {
    backgroundColor: COLORS['Blue-Magenta-Violet'],
  },
  headerTintColor: COLORS['Blue-Magenta-Violet'],
};

const defaultDrawerOptions = {
  activeBackgroundColor: COLORS.WHITE,
  activeTintColor: COLORS.GREEN,
  inactiveBackgroundColor: COLORS.PALE_GREY,
  drawerBackgroundColor: COLORS.PALE_GREY,
  overlayColor: COLORS.WHITE,
  
  contentOptions: {
    activeTintColor: COLORS.WHITE,
    
  },
  
  hideStatusBar: true,
};

const HomeStackNavigator = createStackNavigator();

export const HomeScreenNavigator = () => {
  return (
    <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
      <HomeStackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="DashBoard"
        component={DashBoardScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="IdentificationScreen"
        component={IdentificationScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="DataBaseScreen"
        component={DataBaseScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="AddElephantScreen"
        component={AddElephantScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="DataBaseAddScreen"
        component={DataBaseAddScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="SelectedElephantScreen"
        component={SelectedElephantScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
       <HomeStackNavigator.Screen
        name="DataBaseFormScreen"
        component={DataBaseFormScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthScreenNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName="Login"
      screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <AuthStackNavigator.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
    </AuthStackNavigator.Navigator>
  );
};

const DrawerNavigator = createDrawerNavigator();

export const DrawerScreenNavigator = props => {
  const dispatch = useDispatch();
  console.log('drawer props', props);
  const user = props.user ? props.user[0] : {};
  const handleLogout = () => {
     dispatch(actionLogout())
  };
  return (
    <DrawerNavigator.Navigator
      drawerStyle={{
        width: '60%',
        borderWidth: 1,
        backgroundColor: COLORS.PALE_GREY,
        borderColor: COLORS.PALE_GREY,
      }}
      drawerPosition={'right'}
      drawerType={'slide'}
      overlayColor="transparent"
      drawerContent={props => {
        return (
          <SafeAreaView style={{flex: 1}}>
            <ScrollView>
              <View>
                <View style={{backgroundColor: COLORS.PALE_GREY}}>
                  <View
                    style={{
                      height: moderateScale(80),
                      width: moderateScale(80),
                      backgroundColor: COLORS.WHITE,
                      borderRadius: moderateScale(40),
                      overflow: 'hidden',
                      borderColor: COLORS.WHITE,
                      marginHorizontal: moderateScale(20),
                      marginTop: moderateScale(30),
                      borderWidth:1
                    }}>
                    <Image
                      resizeMethod="resize"
                      resizeMode="cover"
                      style={{
                        height: moderateScale(80),
                        width: moderateScale(80),
                      }}
                      source={require('../Assets/Images/Icons/index.png')}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: moderateScale(30),
                      marginBottom: moderateScale(20),
                    }}>
                    <Text style={{fontSize:moderateScale(18),color:COLORS.BODY_MUTED,fontWeight:'600'}}>{user.name}</Text>
                    <Text style={{fontSize:moderateScale(16),color:COLORS.BODY_MUTED,fontWeight:'400'}}>{user.email}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.listContainer}>
                <DrawerItemList {...props} />
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.bottomContainer}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </SafeAreaView>
        );
      }}
      drawerContentOptions={defaultDrawerOptions}>
      <DrawerNavigator.Screen
        name="Home"
        component={HomeScreenNavigator}
      
        options={{
          // drawerIcon: drawerConfig => <Image width={10} height={10} source={require('../Assets/Images/Icons/home.png')} />,
          headerMode: 'none',
          headerShown: false,
          drawerLabel:'Home',  
        }}
        
      />
      <DrawerNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={{
          // drawerIcon: drawerConfig => <Image width={10} height={10} source={require('../Assets/Images/Icons/groups.png')} />,
          headerMode: 'none',
          headerShown: false,
          drawerLabel:'Search',
       
        }}
      />
      <DrawerNavigator.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          // drawerIcon: drawerConfig => <Image width={10} height={10} source={require('../Assets/Images/Icons/settings.png')} />,
          headerMode: 'none',
          headerShown: false,
          drawerLabel:'Contact Us',
        }}
      />
      <DrawerNavigator.Screen
        name="Guide"
        component={GuideScreen}
        options={{
          // drawerIcon: drawerConfig => <Image width={10} height={10} source={require('../Assets/Images/Icons/settings.png')} />,
          headerMode: 'none',
          headerShown: false,
          drawerLabel:'Guide',
        }}
      />
    </DrawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: '20%',
    marginHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
  },
  icon: {
    width: 35,
    height: 35,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    marginHorizontal: '30%',
    width: '50%',
    backgroundColor: 'red',
    marginBottom: '30%',
  },
});
