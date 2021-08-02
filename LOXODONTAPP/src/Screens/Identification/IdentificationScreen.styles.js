import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../Constants/AppConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.WHITE
  },

  textContainer: {
    marginTop: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(50),
  },
  buttonText: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  contentContainer: {
    // flex: 1,
    marginHorizontal: moderateScale(30),
    marginVertical:moderateScale(10),
    flexWrap:'nowrap',
    justifyContent:'center',
    alignItems:'center'
    // height:400
  },
  buttonContainer:{
      height:moderateScale(50),
      marginBottom:moderateScale(20),
      backgroundColor:COLORS.GREEN,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'flex-end',
      width:'30%',
      borderWidth:1,
      borderRadius:8,
      borderColor:COLORS.GREEN
  }

});
export default styles;
