import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './AddElephantScreen.styles';
import Header from '../../Components/Header';
import backButton from '../../Assets/Images/Icons/back.png';
import cameraIcon from '../../Assets/Images/Icons/camera.png';
import {moderateScale} from 'react-native-size-matters';
import {BASE_URL, COLORS, MESSAGES} from '../../Constants/AppConstants';
import {IdentificationOptions} from '../../Data/OptionList';
import * as ImagePicker from 'react-native-image-picker';
import {createFileUploadNetworkRequest} from '../../Services/Network/createAction';
import {useDispatch, useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import ModalView from '../../Components/ModalView';
import {actionCreateElephant} from '../../Store/Actions/Elephant';

const AddElephantScreen = props => {
  console.log('PROPS Add Elephant',JSON.parse(props.route?.params.item));
const elephantData = JSON.parse(props.route?.params.item);
const isEditable = props.route?.params?.editable ? props.route?.params?.editable  : false;
  const user =useSelector(state=>state.auth.user)
  const [gender, setGender] = useState(elephantData?.gender);
  const [age, setAge] = useState(elephantData?.age);
  const [tusks, setTusks] = useState(elephantData?.tusks);
  const [name, setName] = useState(elephantData?.name);
  const [ears, setEars] = useState(elephantData?.ears);
  const [tail, setTail] = useState(elephantData?.tail);
  const [comments, setComments] = useState(elephantData?.comments);
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState(elephantData?.images);
  const [identificationList, setIdentificationList] = useState(
    IdentificationOptions,
  );
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  

  useEffect(() => {}, [dispatch]);

  //previous form
  // const renderOption = (item, itemIndex) => {
  //   const backgroundColor =
  //     itemIndex % 2 === 0 ? COLORS.LIGHTGREEN : COLORS.WHITE;

  //   const handlePress = (option, optionIndex, key, index) => {
  //     const listData = identificationList;
  //     listData[index].options.map(
  //       optionChange => (optionChange.selected = false),
  //     );
  //     listData[index].options[optionIndex].selected = !option.selected;
  //     setIdentificationList(listData);

  //     if (key === 'Gender') {
  //       setGender(option.value);
  //     }
  //     if (key === 'Age') {
  //       setAge(option.value);
  //     }
  //     if (key === 'Tusks') {
  //       setTusks(option.value);
  //     }
  //   };

  //   return (
  //     <View
  //       style={{
  //         backgroundColor: backgroundColor,
  //         flexDirection: 'row',
  //         minHeight: moderateScale(120),
  //         justifyContent: 'space-between',
  //       }}>
  //       <View
  //         style={{
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           width: '30%',
  //         }}>
  //         <View style={{marginVertical: moderateScale(10)}}>
  //           <Text style={{alignSelf: 'center'}}>{item.name}</Text>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           width: '30%',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         {item.options.map(option => (
  //           <View
  //             style={{
  //               marginVertical: moderateScale(10),
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //               height: moderateScale(20),
  //             }}>
  //             <Text style={{alignSelf: 'center'}}>{option.name}</Text>
  //           </View>
  //         ))}
  //       </View>
  //       <View
  //         style={{
  //           width: '30%',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         {item.options.map((option, index) =>
  //           option.selected ? (
  //             (() => {
  //               console.log('OP', option);
  //             },
  //             (
  //               <TouchableOpacity
  //                 onPress={() =>
  //                   handlePress(option, index, item.name, itemIndex)
  //                 }
  //                 style={{
  //                   height: moderateScale(20),
  //                   width: moderateScale(20),
  //                   marginVertical: moderateScale(10),
  //                   borderColor: COLORS.GREEN,
  //                 }}>
  //                 <Image
  //                   style={{
  //                     height: moderateScale(20),
  //                     width: moderateScale(20),
  //                   }}
  //                   resizeMode="contain"
  //                   resizeMethod="resize"
  //                   source={require('../../Assets/Images/Icons/checkBox.png')}
  //                 />
  //               </TouchableOpacity>
  //             ))
  //           ) : (
  //             <TouchableOpacity
  //               onPress={() => handlePress(option, index, item.name, itemIndex)}
  //               style={{
  //                 height: moderateScale(20),
  //                 width: moderateScale(20),
  //                 borderRadius: 5,
  //                 borderColor: COLORS.GREEN,
  //                 backgroundColor: COLORS.WHITE,
  //                 marginVertical: moderateScale(10),
  //                 borderWidth: 1,
  //               }}>
  //               <Text></Text>
  //             </TouchableOpacity>
  //           ),
  //         )}
  //       </View>
  //     </View>
  //   );
  // };

  const selectPhoto = async () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.errorCode) {
        console.log('ERROR', errorCode);
        console.log(response.errorMessage);
      } else {
        const imageData = response.assets[0];
        setImageArray([...imageArray, {...imageData}]);
      }
    });
  };
  const fileUploadRequest = async () => {
    let pushedImages = [];
    imageArray.map(item => {
      createFileUploadNetworkRequest('POST', 'fileUpload', item).then(
        response => {
          if (response.success) {
            const imagePath = `${BASE_URL}/${response.data.path}`;
            pushedImages.push(imagePath);
          }
        },
      );
    });
    return pushedImages;
  };

  const handleSubmit = async () => {
    if (
      name &&
      age &&
      tusks &&
      gender &&
      tail &&
      ears &&
      comments &&
      imageArray.length > 0
    ) {
      if (netInfo.isConnected) {
        setLoading(true);
        try {
        const pushedImages = await fileUploadRequest();
        user['date'] = new Date();
        
          const data = {
            images: pushedImages,
            name: name,
            gender,
            age,
            tusks,
            ears,
            tail,
            comments,
            addedBy:user
          };
          console.log("INSIDE ADD ELEPHANT ",data)
          await dispatch(actionCreateElephant(data));
          props.navigation.push('SuccessScreen');
        } catch (error) {
          Alert.alert(MESSAGES.ERROR, error.message, [{text: MESSAGES.OK}]);
        }
      } else {
        Alert.alert(MESSAGES.ERROR, MESSAGES.NETWORK_ERROR, [
          {text: MESSAGES.OK},
        ]);
      }
    } else {
      Alert.alert(MESSAGES.ERROR, 'FILL ALL FIELDS', [{text: MESSAGES.OK}]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: moderateScale(50),
          marginHorizontal: moderateScale(10),
          marginTop: moderateScale(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{}}>
          <Image
            style={{width: moderateScale(80), height: moderateScale(45)}}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../Assets/Images/Icons/back.png')}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
          style={{}}>
          <Image
            style={{width: moderateScale(80), height: moderateScale(45)}}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../Assets/Images/Icons/sidemenu.png')}
          />
        </TouchableOpacity> */}
      </View>
      <View
        style={{justifyContent: 'center', marginVertical: moderateScale(20)}}>
        <Text
          style={{
            fontSize: moderateScale(18),
            alignSelf: 'center',
            fontWeight: '600',
            color: COLORS.GREEN,
          }}>
          Add Elephant
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: moderateScale(10),
          justifyContent: 'center',
        }}>
      {isEditable &&  <TouchableOpacity onPress={selectPhoto} style={styles.imageContainer}>
          {imageArray.length > 3 ? (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[1]}}
            />
          ) : (
            <Image
              resizeMode="contain"
              resizeMethod="resize"
              style={{height: moderateScale(30), width: moderateScale(45)}}
              source={cameraIcon}
            />
          )}
        </TouchableOpacity>}
        <View style={styles.imageDottedContainer}>
          {imageArray.length > 0 && (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[0]}}
            />
          )}
        </View>
        <View style={styles.imageDottedContainer}>
          {imageArray.length > 1 && (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[1]}}
            />
          )}
        </View>
        <View style={styles.imageDottedContainer}>
          {imageArray.length > 2 && (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[2]}}
            />
          )}
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginHorizontal: moderateScale(10),
            marginTop: moderateScale(30),
          }}>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={{marginBottom: moderateScale(5)}}>
              <Text
                style={{fontSize: moderateScale(15), color: COLORS.BODY_MUTED}}>
                Name
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                editable={isEditable}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="eg.Elephant"
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={{marginBottom: moderateScale(5)}}>
              <Text
                style={{fontSize: moderateScale(15), color: COLORS.BODY_MUTED}}>
                Age
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                editable={isEditable}
                value={age}
                onChangeText={text => setAge(text)}
                placeholder="eg.Bull"
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={{marginBottom: moderateScale(5)}}>
              <Text
                style={{fontSize: moderateScale(15), color: COLORS.BODY_MUTED}}>
                Gender
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                editable={isEditable}
                value={gender}
                onChangeText={text => setGender(text)}
                placeholder="eg.Bull"
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={{marginBottom: moderateScale(5)}}>
              <Text
                style={{fontSize: moderateScale(15), color: COLORS.BODY_MUTED}}>
                Tusks
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                editable={isEditable}
                value={tusks}
                onChangeText={text => setTusks(text)}
                placeholder="eg.L only"
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={{marginBottom: moderateScale(5)}}>
              <Text
                style={{fontSize: moderateScale(15), color: COLORS.BODY_MUTED}}>
                Ears
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                editable={isEditable}
                value={ears}
                onChangeText={text => setEars(text)}
                placeholder="eg.Tears in 9"
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={{marginBottom: moderateScale(5)}}>
              <Text
                style={{fontSize: moderateScale(15), color: COLORS.BODY_MUTED}}>
                Tail
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                editable={isEditable}
                value={tail}
                onChangeText={text => setTail(text)}
                placeholder="eg.No Hair "
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{marginHorizontal: moderateScale(20)}}>
            <View style={{marginBottom: moderateScale(5)}}>
              <Text
                style={{fontSize: moderateScale(15), color: COLORS.BODY_MUTED}}>
                Comments
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                editable={isEditable}
                value={comments}
                onChangeText={text => setComments(text)}
                placeholder="Comment"
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
              />
            </View>
          </View>

          {/* {identificationList.map((item, index) => renderOption(item, index))} */}
        </View>
    {isEditable &&    <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            backgroundColor: COLORS.GREEN,
            height: moderateScale(45),
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.GREEN,
            borderRadius: moderateScale(10),
            alignSelf: 'flex-end',
            marginHorizontal: moderateScale(20),
            marginVertical: moderateScale(20),
          }}>
          <Text style={{color: COLORS.WHITE}}>SUBMIT</Text>
        </TouchableOpacity>}
      </ScrollView>
      {loading && (
        <ModalView isVisible={loading}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.TRANSPARENT_WHITE,
            }}>
            <ActivityIndicator color={COLORS.GREEN} sze="large" />
          </View>
        </ModalView>
      )}
    </SafeAreaView>
  );
};
export default AddElephantScreen;
