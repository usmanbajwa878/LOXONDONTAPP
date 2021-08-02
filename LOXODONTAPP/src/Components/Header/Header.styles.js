import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import { COLORS } from '../../Constants/AppConstants';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop:moderateScale(10),
    height: moderateScale(50),
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:moderateScale(20),
  },
  headerLeftButton:{
    height: moderateScale(45),
    alignItems:'center',
    justifyContent:'center'
  },
  headerRightButton:{
    // height: moderateScale(45),
    width:moderateScale(60),
    height:'100%',
  },
  headerCenterView:{
    height: moderateScale(45),
    alignItems:'center',
    justifyContent:'center' 
  },
  headerText:{
    fontSize:moderateScale(16),
    color:COLORS.GREEN
  }
});

export default styles;