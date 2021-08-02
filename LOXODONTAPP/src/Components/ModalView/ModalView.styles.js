import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../Constants/AppConstants';

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
  },
//   modalView: {
//     alignItems: 'center',
//     backgroundColor: COLORS.TRANSPARENT_WHITE,
//     borderRadius: moderateScale(10),
//     elevation: 1,
//     // height: 220,
//     justifyContent: 'space-between',
//     // left: Theme.LAYOUT.window.width * 0.05,
//     padding: 15,
//     position: 'absolute',
//     shadowColor: COLORS.BLACK,
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.06,
//     shadowRadius: 1,
//     // top: Theme.LAYOUT.window.height * 0.35,
//     width: '90%',
//   },
  
});

export default styles;
