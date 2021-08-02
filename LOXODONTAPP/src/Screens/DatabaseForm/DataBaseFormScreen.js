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
import styles from './DataBaseFormScreen.styles';
import Header from '../../Components/Header';
import backButton from '../../Assets/Images/Icons/back.png';
import cameraIcon from '../../Assets/Images/Icons/camera.png';
import {moderateScale} from 'react-native-size-matters';
import {BASE_URL, COLORS, MESSAGES} from '../../Constants/AppConstants';
import {IdentificationOptions} from '../../Data/OptionList';
import * as ImagePicker from 'react-native-image-picker';
import {createFileUploadNetworkRequest} from '../../Services/Network/createAction';
import {useDispatch} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import ModalView from '../../Components/ModalView';
import {actionCreateElephant} from '../../Store/Actions/Elephant';

const DataBaseFormScreen = props => {


    console.log("DATA BASE FORM SCREEN",props.route.params.item)

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [tusks, setTusks] = useState('');
  const [name, setName] = useState('');
  const [ears, setEars] = useState('');
  const [tail, setTail] = useState('');
  const [comments, setComments] = useState('');
  const [seenWith,setSeenWith] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [identificationList, setIdentificationList] = useState(
    IdentificationOptions,
  );
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  useEffect(() => {}, [dispatch]);

  //previous form
  const renderOption = (item, itemIndex) => {
    const backgroundColor =
      itemIndex % 2 === 0 ? COLORS.LIGHTGREEN : COLORS.WHITE;

    const handlePress = (option, optionIndex, key, index) => {
      const listData = identificationList;
      listData[index].options.map(
        optionChange => (optionChange.selected = false),
      );
      listData[index].options[optionIndex].selected = !option.selected;
      setIdentificationList(listData);

      if (key === 'GENDER') {
        setGender(option.value);
      }
      if (key === 'AGE') {
        setAge(option.value);
      }
      if (key === 'TUSK') {
        setTusks(option.value);
      }
      if (key === 'TAIL') {
        setTail(option.value);
      }
      
    };

    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          flexDirection: 'row',
          minHeight: moderateScale(120),
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
          }}>
          <View style={{marginVertical: moderateScale(10)}}>
            <Text style={{alignSelf: 'center'}}>{item.name}</Text>
          </View>
        </View>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.options.map(option => (
            <View
              style={{
                marginVertical: moderateScale(10),
                alignItems: 'center',
                justifyContent: 'center',
                height: moderateScale(20),
              }}>
              <Text style={{alignSelf: 'center'}}>{option.name}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.options.map((option, index) =>
            option.selected ? (
              (() => {
                console.log('OP', option);
              },
              (
                <TouchableOpacity
                  onPress={() =>
                    handlePress(option, index, item.name, itemIndex)
                  }
                  style={{
                    height: moderateScale(20),
                    width: moderateScale(20),
                    marginVertical: moderateScale(10),
                    borderColor: COLORS.GREEN,
                  }}>
                  <Image
                    style={{
                      height: moderateScale(20),
                      width: moderateScale(20),
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                    source={require('../../Assets/Images/Icons/checkBox.png')}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity
                onPress={() => handlePress(option, index, item.name, itemIndex)}
                style={{
                  height: moderateScale(20),
                  width: moderateScale(20),
                  borderRadius: 5,
                  borderColor: COLORS.GREEN,
                  backgroundColor: COLORS.WHITE,
                  marginVertical: moderateScale(10),
                  borderWidth: 1,
                }}>
                <Text></Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>
    );
  };

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

          const data = {
            images: pushedImages,
            name: name,
            gender,
            age,
            tusks,
            ears,
            tail,
            comments,
          };
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
        <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
          style={{}}>
          <Image
            style={{width: moderateScale(80), height: moderateScale(45)}}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../Assets/Images/Icons/sidemenu.png')}
          />
        </TouchableOpacity>
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
          Elehant Identification Form
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: moderateScale(10),
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={selectPhoto} style={styles.imageContainer}>
          {imageArray.length > 3 ? (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[1].uri}}
            />
          ) : (
            <Image
              resizeMode="contain"
              resizeMethod="resize"
              style={{height: moderateScale(30), width: moderateScale(45)}}
              source={cameraIcon}
            />
          )}
        </TouchableOpacity>
        <View style={styles.imageDottedContainer}>
          {imageArray.length > 0 && (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[0].uri}}
            />
          )}
        </View>
        <View style={styles.imageDottedContainer}>
          {imageArray.length > 1 && (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[1].uri}}
            />
          )}
        </View>
        <View style={styles.imageDottedContainer}>
          {imageArray.length > 2 && (
            <Image
              style={{height: moderateScale(70), width: moderateScale(70)}}
              source={{uri: imageArray[2].uri}}
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
          {identificationList.map((item, index) => renderOption(item, index))}
          <View style={{flexDirection: 'row',marginVertical:moderateScale(10),backgroundColor:COLORS.LIGHTGREEN}}>
          <View style={{justifyContent:'center',width:'22%',paddingLeft:2}}>
              <Text style={{}}>Seen With:</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
                placeholder="Seen With"
                value={seenWith}
                onChangeText={(text)=>setSeenWith(text)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent:'center',width:'22%',paddingLeft:2}}>
              <Text style={{}}>Comments:</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={COLORS.BODY_MUTED}
                style={styles.input}
                placeholder="Comments"
                value={comments}
                onChangeText={(text)=>setComments(text)}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
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
export default DataBaseFormScreen;
