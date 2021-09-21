import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import styles from './PreviewElephant.styles';
import Header from '../../Components/Header';
import backButton from '../../Assets/Images/Icons/back.png';
import cameraIcon from '../../Assets/Images/Icons/camera.png';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, MESSAGES} from '../../Constants/AppConstants';
import elephantIcon from '../../Assets/Images/Icons/elephant.png';
import {IdentificationOptions} from '../../Data/OptionList';
import * as ImagePicker from 'react-native-image-picker';
import {IdentificationFormList} from '../../Data/IdentificationFormList';
import ModalView from '../../Components/ModalView';
import {useSelector, useDispatch} from 'react-redux';
import {
  actionCreateElephant,
  actionFindSpecificElephant,
} from '../../Store/Actions/Elephant';
import {useNetInfo} from '@react-native-community/netinfo';

const PreviewElephantScreen = props => {
  console.log('Preview Elephant props', props.route.params);
  const [formList, setFormList] = useState(IdentificationFormList);
  const [imageArray, setImageArray] = useState([]);
  const [showPopUp, setShowPop] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const user = useSelector(state => state.auth.user);

  const selectedElephant = props.route.params?.item;
  const userInteraction = props.route.params?.userInteraction;
  const popUpData = props.route.params?.popUpData;
  const imagesArray = [elephantIcon, elephantIcon, elephantIcon, elephantIcon];

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const selectPhoto = async () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert(response.error);
      } else if (response.errorCode) {
        console.log('ERROR', errorCode);
        console.log(response.errorMessage);
      } else {
        const imageData = response.assets[0];
        console.log('imageData', imageData);
        setImageArray([...imageArray, {...imageData}]);
        console.log('imageArray', imageArray);
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
      }
    });
  };

  const handleAddElephant = async () => {
    selectedElephant.userId = user._id;
    const addObject = {...user,date:new Date()}
    selectedElephant.addedBy = [
      ...selectedElephant?.addedBy,addObject,
    ];
 
    console.log("INSIDE PEVIEW ELEPHANT ADD",user)
    try {
      if (netInfo.isConnected) {
        await dispatch(actionCreateElephant(selectedElephant));
        //    setShowPop(false);
        //  setShowAddElephant(false);
        props.navigation.push('SuccessScreen');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = async () => {
    const searchData = {
      // Date: dateSelected ? selectedElephant.Date : '',
      gender: genderSelected ? selectedElephant.gender : '',
      age: ageSelected ? selectedElephant.age : '',
      tusks: tuskSelected ? selectedElephant.tusks : '',
      ears: earSelected ? selectedElephant.ears : '',
      tail: tailSelected ? selectedElephant.tail : '',
      specialFeatures: specialFeatureSelected
        ? selectedElephant.specialFeatures
        : '',
      comment: specialFeatureSelected ? selectedElephant.comments : '',
      seenWith: specialFeatureSelected ? selectedElephant.seenWith : '',
    };

    for (var propName in searchData) {
      if (
        searchData[propName] === null ||
        searchData[propName] === undefined ||
        searchData[propName] === ''
      ) {
        delete searchData[propName];
      }
    }

    try {
      if (netInfo.isConnected) {
        await dispatch(actionFindSpecificElephant(searchData));
        setShowConfirmation(false);
        props.navigation.push('DataBaseAddScreen', {
          showPopUp: false,
          selectedElephant: selectedElephant,
        });
      } else {
        Alert.alert(MESSAGES.ERROR, MESSAGES.NETWORK_ERROR, [
          {text: MESSAGES.OK},
        ]);
      }
    } catch (error) {
      console.log('error', error);
      Alert.alert(MESSAGES.ERROR, error.message, [{text: MESSAGES.OK}]);
    }

    console.log('Search Ready Data', searchData);
    //find specfic
    // props.navigation.push('DataBaseAddScreen', {showPopUp: true});
    //getDesired results based on search and navigate to new screen shoing just data
  };

  const handleItemSelect = (item, index) => {
    console.log('item', item);
    formList[index].selected = !item.selected;
    setFormList([...formList]);
  };

  const handleEditElephant = () => {
    console.log('INSIDE EDIT ELEPHANT');
    setShowPop(false);
    console.log('HELLO');
    props.navigation.push('AddElephantScreen', {
      item: JSON.stringify(selectedElephant),
    });
  };
  const handleAdd = () => {
    console.log('user', user[0].userId);
    if (selectedElephant.userId === user[0].userId) {
      //have access
      setShowPop(true);
    } else {
      setShowAlert(true);
      setShowPop(false);
      //you can view only
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
          {`Profile ${selectedElephant.gender}`}
        </Text>
      </View>

      {userInteraction && (
        <TouchableOpacity
          onPress={() => handleAdd()}
          style={styles.addButtonContainer}>
          <View
            style={{
              backgroundColor: COLORS.GREEN,
              height: moderateScale(40),
              width: moderateScale(40),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: moderateScale(5),
              borderColor: COLORS.GREEN,
              marginHorizontal: moderateScale(10),
              marginVertical: moderateScale(20),
            }}>
            <Text
              style={{
                fontSize: moderateScale(30),
                fontWeight: '700',
                color: COLORS.WHITE,
              }}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: moderateScale(10),
          justifyContent: 'center',
        }}>
        {selectedElephant.images && selectedElephant.images.length > 0 ? (
          selectedElephant.images.map(item => (
            <View onPress={selectPhoto} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="resize"
                style={{height: moderateScale(80), width: moderateScale(70)}}
                source={{uri: item}}
              />
            </View>
          ))
        ) : (
          <View onPress={selectPhoto} style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              resizeMethod="resize"
              style={{height: moderateScale(80), width: moderateScale(70)}}
              source={elephantIcon}
            />
          </View>
        )}
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginHorizontal: moderateScale(10),
            marginTop: moderateScale(30),
          }}>
          {/* {IdentificationFormList.map((item, index) =>
            renderItem({item, index}),
          )} */}
          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.GREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>Date</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {new Date(selectedElephant.Date)
                      .toUTCString()
                      .split(' ')
                      .slice(0, 4)
                      .join(' ')}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.LIGHTGREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>Gender</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant.gender}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.GREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>Age</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant.age}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.LIGHTGREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>Tusks</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant.tusks}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.GREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>Ears</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant.ears.replace('/,/g', '\n')}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.LIGHTGREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>Tail</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant.tail}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.GREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    SpecialFeatures
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant?.specialFeatures}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.LIGHTGREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    Seen With
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant?.seenWith}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.GREEN,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>Comment</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant?.comments}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              maxHeight: moderateScale(220),
              justifyContent: 'space-between',
            }}>
            <View style={styles.itemContentContainer}>
              <View
                style={{
                  backgroundColor: COLORS.WHITE,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: moderateScale(50),
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    Added By
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '100%',
                    backgroundColor: COLORS.PALE_GREY,
                    marginBottom:20
                  }}>
                  {selectedElephant?.addedBy &&
                    selectedElephant.addedBy.map(item => (
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                       <View style={{flexDirection:'row',width:'70%'}}>
                        <Text style={{padding: 5, color: COLORS.BLACK}}>
                            {item.name}
                          </Text>
                          <Text style={{padding: 5, color: COLORS.BLACK,marginLeft:20}}>
                            {new Date(item?.date).toDateString()}
                          </Text>
                       </View>
                       <View style={{flexDirection:'row',width:'30%',justifyContent:'flex-end'}}>
                         <TouchableOpacity onPress={()=>props.navigation.push('AddElephantScreen',{item:JSON.stringify(selectedElephant)})} style={{marginHorizontal:5}}><Image source={require('../../Assets/Images/Icons/eye.png')}/></TouchableOpacity>
                         <TouchableOpacity onPress={()=>props.navigation.push('AddElephantScreen',{item:JSON.stringify(selectedElephant),editable:true})} ><Image source={require('../../Assets/Images/Icons/edit.png')}/></TouchableOpacity>
                       </View>
                     
                      </View>
                    ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => setShowConfirmation(true)}
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
        </TouchableOpacity> */}
      </ScrollView>
      {showAlert &&
        Alert.alert('', 'Are you Sure you would like to add new elephant', [
          {text: 'OK', onPress: () => handleAddElephant()},
        ])}
      {showPopUp && (
        <ModalView visible={showPopUp}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.TRANSPARENT_WHITE,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                minHeight: moderateScale(200),
                minWidth: moderateScale(200),
                backgroundColor: COLORS.PALE_GREY,
                justifyContent: 'center',
                borderRadius: moderateScale(20),
                borderWidth: 1,
                marginHorizontal: moderateScale(20),
                borderColor: COLORS.PALE_GREY,
                // justifyContent: 'center',
              }}>
              <View style={{justifyContent: 'center', marginHorizontal: 20}}>
                <Text
                  style={{alignSelf: 'center', fontSize: moderateScale(15)}}>
                  {`Are you sure you would like to add data to ${selectedElephant.gender}`}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: moderateScale(10),
                }}>
                <TouchableOpacity
                  onPress={() => setShowPop(false)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.GREEN,
                    minHeight: moderateScale(45),
                    minWidth: moderateScale(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.GREEN,
                      fontSize: moderateScale(15),
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEditElephant()}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.GREEN,
                    minHeight: moderateScale(45),
                    minWidth: moderateScale(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.GREEN,
                  }}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontSize: moderateScale(15),
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ModalView>
      )}
    </SafeAreaView>
  );
};
export default PreviewElephantScreen;
