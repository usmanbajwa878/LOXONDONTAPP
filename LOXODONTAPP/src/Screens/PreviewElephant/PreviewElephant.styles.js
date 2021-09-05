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
    marginVertical: moderateScale(10),
    flexWrap: 'nowrap',
    // height:400
  },
  buttonContainer: {
    height: moderateScale(50),
    marginBottom: moderateScale(20),
    backgroundColor: COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '30%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.GREEN,
  },
  pickerContainers: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  pickerView: {
    height: moderateScale(50),
    borderWidth: 1,
    borderColor: COLORS.PALE_GREY,
    backgroundColor: COLORS.PALE_GREY,
    borderRadius: 10,
    width: moderateScale(200),
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  input: {
    height: '100%',
    padding: moderateScale(10),
  },
  itemImageContainer: {
    width: '30%',
  },
  itemContentContainer: {
    marginHorizontal:moderateScale(10),
  },
  itemColoured: {
    backgroundColor: COLORS.PALE_GREY,
    flexDirection: 'row',
    minHeight: moderateScale(30),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemColouredLight: {
    backgroundColor: COLORS.BORDER_GRAY,
    flexDirection: 'row',
    minHeight: moderateScale(30),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButtonContainer:{
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    justifyContent: 'flex-end',
  },
  imageContainer:{
      height:moderateScale(70),
      width:moderateScale(70),
      backgroundColor:COLORS.WHITE,
      borderWidth:1,
      borderColor:COLORS.GREEN,
      borderRadius:moderateScale(8),
      marginHorizontal:moderateScale(5),
      overflow:'hidden'
      // justifyContent:"center",
      // alignItems:'center'
  },
  imageDottedContainer:{
    height:moderateScale(70),
    width:moderateScale(70),
    backgroundColor:COLORS.WHITE,
    borderWidth:1,
    borderColor:COLORS.BLACK,
    borderRadius:moderateScale(10),
    marginHorizontal:moderateScale(5),
    borderStyle:'dashed',
    overflow:'hidden'
  }
});
export default styles;
