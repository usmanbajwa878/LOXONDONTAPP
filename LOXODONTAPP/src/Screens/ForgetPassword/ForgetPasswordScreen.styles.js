import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import {COLORS} from '../../Constants/AppConstants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:COLORS.WHITE
  },
  AccessText:{
      fontSize:moderateScale(25),
      marginTop:moderateScale(40),
      alignSelf:'center',
      color:COLORS.GREEN,
  },
  topView: {
    // height: moderateScale(45),
    marginHorizontal: moderateScale(20),
    marginTop: '20%',
    justifyContent:'center',
    alignItems:'center'
  },
  topText: {
    fontSize: moderateScale(25),
    textAlign: 'center',
    color:COLORS.GREEN,
    fontWeight:'800'
  },
  inputContainer: {
    marginTop: moderateScale(40),
    height: moderateScale(50),
    marginHorizontal: moderateScale(20),
    backgroundColor: COLORS.PALE_GREY,
    borderWidth: 1,
    borderColor: COLORS.PALE_GREY,
    borderRadius: 10,
    justifyContent:'center',
  },
  input: {
    height: moderateScale(50),
    width: '100%',
    paddingHorizontal:moderateScale(20),
    paddingVertical:moderateScale(10),
    fontSize:moderateScale(16),
    backgroundColor:COLORS.PALE_GREY,
    color:COLORS.BLACK
  },
  PolicyView: {
    height: moderateScale(40),
    marginTop: moderateScale(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal:moderateScale(20)
  },
  checkBox: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 5,
  },
  policyText: {
    fontSize: moderateScale(18),
    textAlign: 'justify',
    color: COLORS.GREEN,
  },
  confirmBtn: {
    marginTop: moderateScale(30),
    height: moderateScale(50),
    width:'30%',
    marginHorizontal: moderateScale(20),
    backgroundColor: COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.GREEN,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 10,
    alignSelf:'flex-end'
  },
  forgetPasswordBtn: {
    height: moderateScale(30),
    width: '100%',
  },
  loginText: {
    fontWeight:'400',
    color:COLORS.GREEN
  },
  signUpContainer: {
    height: 30,
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: COLORS['Persian Indigo'],
  },
  forgetPasswordText: {
    fontSize: 15,
    color: COLORS.NormalLightGrey,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});

export default styles;
