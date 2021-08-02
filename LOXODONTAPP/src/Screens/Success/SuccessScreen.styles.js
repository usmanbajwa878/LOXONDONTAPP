import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import { COLORS } from '../../Constants/AppConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.WHITE,
    justifyContent:'center',
    alignItems:'center',
  },
  
  addButtonContainer: {
    height: moderateScale(45),
    width:'50%',
    borderWidth:1,
    borderRadius:10,
    borderColor:COLORS.GREEN,
    marginVertical:moderateScale(20),
    justifyContent:'center',
    alignItems:'center'
  },
  plusButton:{
    fontSize:moderateScale(15),
    fontWeight:'700',
    color:COLORS.GREEN
  },
  searchButtonContainer: {
    height: moderateScale(100),
    width:'40%',
    backgroundColor: COLORS.WHITE,
    borderWidth:1,
    borderRadius:10,
    borderColor:COLORS.GREEN,
    justifyContent:'center',
    alignItems:'center'
  },
  textContainer:{
    marginTop:moderateScale(50),
    justifyContent:"center",
    alignItems:'center',
    marginHorizontal:moderateScale(50)
  },
  buttonText:{
    fontSize:moderateScale(16),
    textAlign:'center',
    color:COLORS.GREEN,
    fontWeight:'600'
  }
});
export default styles;
