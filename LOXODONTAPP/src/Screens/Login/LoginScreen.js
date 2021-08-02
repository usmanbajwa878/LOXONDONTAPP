import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {loginVerification} from '../../Utilities/Verification';
import {
  COLORS,
  TEXTS,
  MESSAGES,
  PLACEHOLDERS,
} from '../../Constants/AppConstants';
import styles from './LoginScreen.styles';
import {moderateScale} from 'react-native-size-matters';
import { actionlogin } from '../../Store/Actions/Auth';

const LoginScreen = props => {
  
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('abcd1234@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const handleCheck = () => {
    setCheck(!check);
  };
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (netInfo.isConnected) {
      var status = loginVerification(email, password);
      if (status.verified) {
        setLoading(true);
        try {
          const data = {
            email,
            password
          }
          await dispatch(actionlogin(data));
        } catch (error) {
          Alert.alert(MESSAGES.ERROR, error.message, [{text: MESSAGES.OK}]);
        }
        setLoading(false);
      } else {
        Alert.alert(MESSAGES.ERROR, status.message, [{text: MESSAGES.OK}]);
      }
    } else {
      Alert.alert(MESSAGES.ERROR,MESSAGES.NETWORK_ERROR,[{text:MESSAGES.OK}])
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={{backgroundColor: COLORS.WHITE}}>
        <View style={styles.screen}>
          <View style={styles.topView}>
            <Image
              resizeMode="cover"
              resizeMethod="resize"
              style={{
                minWidth: moderateScale(100),
                minHeight: moderateScale(200),
              }}
              source={require('../../Assets/Images/Icons/index.png')}
            />
            {/* <Text style={styles.topText}>
              <Text style={styles.loginText}>Elephant.</Text>
              id
            </Text> */}
          </View>
          <Text style={styles.AccessText}>Please Login to Access</Text>
          <View
            style={{
              ...styles.inputContainer,
              marginTop: moderateScale(15),
              flexDirection: 'row',
            }}>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder={PLACEHOLDERS.EMAIL}
              placeholderTextColor={COLORS.BODY_MUTED}
              style={styles.input}
            />
          </View>
          <View
            style={{
              ...styles.inputContainer,
              marginTop: moderateScale(15),
              flexDirection: 'row',
            }}>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder={PLACEHOLDERS.PASSWORD}
              secureTextEntry={showPassword}
              placeholderTextColor={COLORS.BODY_MUTED}
              style={[styles.input, { width: '90%' }]}
            />
            <TouchableOpacity
              onPress={handleShow}
              style={{height: 20, width: 20, marginTop: 15, marginLeft: 5}}>
              <Image style={{ width: 20, height: 20 }}
                            source={showPassword ?
                                require('../../Assets/Images/Icons/HidePassword.png')
                                :
                                require('../../Assets/Images/Icons/showPassword.png')
                            }
                        />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.confirmBtn}>
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.WHITE} />
            ) : (
              <Text
                style={{
                  fontSize: moderateScale(20),
                  color: COLORS.WHITE,
                  fontWeight: '600',
                }}>
                Login
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.PolicyView}>
            <View
              style={{
                // width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.forgetPasswordBtn}
                onPress={props.forgetNavigate}>
                <Text style={styles.policyText}>Request Access</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                width: '10%',
                alignItems: 'center',
              }}>
              <Text style={{...styles.policyText}}>|</Text>
            </View>

            <View
              style={{
                // width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.forgetPasswordBtn}
                onPress={()=>props.navigation.push('ForgetPassword')}>
                <Text style={styles.policyText}>ForgetPassword</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
