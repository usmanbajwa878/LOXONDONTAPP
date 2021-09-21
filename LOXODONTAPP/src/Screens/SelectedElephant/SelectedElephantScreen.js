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
import styles from './SelectedElephantScreen.styles';
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
import {actionFindSpecificElephant} from '../../Store/Actions/Elephant';
import {useNetInfo} from '@react-native-community/netinfo';

const renderItem = ({item, index}) => {
  console.log('item', item);
  return (
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
            backgroundColor: index % 2 ? COLORS.GREEN : COLORS.LIGHTGREEN,
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
            <Text style={{padding: 5, color: COLORS.BLACK}}>{item.label}</Text>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '50%',
            }}>
            <Text style={{padding: 5, color: COLORS.BLACK}}>{item.value}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SelectedElephantScreen = props => {


  console.log('SelectedElephantScren props', props.route.params);
  const [formList, setFormList] = useState(IdentificationFormList);
  const [imageArray, setImageArray] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [dateSelected, setDateSelected] = useState(false);
  const [ageSelected, setAgeSelected] = useState(false);
  const [tuskSelected, setTuskSelecetd] = useState(false);
  const [genderSelected, setGenderSelected] = useState(false);
  const [earSelected, setEarSelected] = useState(false);
  const [tailSelected, setTailSelected] = useState(false);
  const [specialFeatureSelected, setSpecialFeatureSelected] = useState(false);

  const selectedElephant = props.route.params?.selectedElephant;
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

  const handleSubmit = async () => {
    console.log("inside submit",tuskSelected)
    if(genderSelected && ageSelected && tuskSelected && earSelected && specialFeatureSelected){
     
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
      comment:specialFeatureSelected
      ? selectedElephant.comments
      : '',
      seenWith:specialFeatureSelected
      ? selectedElephant.seenWith
      : '',
    
    };
  
      for (var propName in searchData) {
        if (searchData[propName] === null || searchData[propName] === undefined || searchData[propName] === '') {
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
      console.log("error",error)
      Alert.alert(MESSAGES.ERROR, error.message, [{text: MESSAGES.OK}]);
    }

    console.log('Search Ready Data', searchData);
    }else{
      Alert.alert('','Kindly Select All fields',[{text:'Okay'}])
  }
    //find specfic
    // props.navigation.push('DataBaseAddScreen', {showPopUp: true});
    //getDesired results based on search and navigate to new screen shoing just data
  };


  const handleItemSelect = (item, index) => {
    console.log('item', item);
    formList[index].selected = !item.selected;
    setFormList([...formList]);
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
          Elephant Identification Form
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: moderateScale(10),
          justifyContent: 'center',
        }}>
        {selectedElephant.images.length > 0 ? (
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
            {selectedElephant.ears &&     <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '50%',
                  }}>
                  <Text style={{padding: 5, color: COLORS.BLACK}}>
                    {selectedElephant?.ears?.replace('/,/g','\n')}
                  </Text>
                </View>}
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
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
      </ScrollView>

      {showConfirmation && (
        <ModalView visible={showConfirmation}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.TRANSPARENT_WHITE,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                minHeight: moderateScale(350),
                width: Dimensions.get('window').width-20,
                backgroundColor: COLORS.WHITE,
                justifyContent: 'center',
                borderRadius: moderateScale(20),
                // justifyContent: 'center',
              }}>
              <View style={{marginHorizontal: moderateScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <Text>Date</Text>
                  </View>
                  <View style={{}}>
                    <Text>
                      {' '}
                      {new Date(selectedElephant.Date)
                        .toUTCString()
                        .split(' ')
                        .slice(0, 4)
                        .join(' ')}
                    </Text>
                  </View>

                  {dateSelected ? (
                    <TouchableOpacity
                      onPress={() => setDateSelected(!dateSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderColor: COLORS.GREEN,
                        borderRadius: moderateScale(5),
                      }}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../Assets/Images/Icons/checkBox.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setDateSelected(!dateSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: moderateScale(5),
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                      }}>
                      <Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{marginHorizontal: moderateScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <Text>Gender</Text>
                  </View>
                  <View style={{}}>
                    <Text> {selectedElephant.gender}</Text>
                  </View>

                  {genderSelected ? (
                    <TouchableOpacity
                      onPress={() => setGenderSelected(!genderSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderColor: COLORS.GREEN,
                        borderRadius: moderateScale(5),
                      }}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../Assets/Images/Icons/checkBox.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setGenderSelected(!genderSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: moderateScale(5),
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                      }}>
                      <Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{marginHorizontal: moderateScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <Text>Age</Text>
                  </View>
                  <View style={{}}>
                    <Text> {selectedElephant.age}</Text>
                  </View>

                  {ageSelected ? (
                    <TouchableOpacity
                      onPress={() => setAgeSelected(!ageSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderColor: COLORS.GREEN,
                        borderRadius: moderateScale(5),
                      }}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../Assets/Images/Icons/checkBox.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setAgeSelected(!ageSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: moderateScale(5),
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                      }}>
                      <Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{marginHorizontal: moderateScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <Text>Tusks</Text>
                  </View>
                  <View style={{}}>
                    <Text> {selectedElephant.tusks}</Text>
                  </View>

                  {tuskSelected ? (
                    <TouchableOpacity
                      onPress={() => setTuskSelecetd(!tuskSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderColor: COLORS.GREEN,
                        borderRadius: moderateScale(5),
                      }}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../Assets/Images/Icons/checkBox.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setTuskSelecetd(!tuskSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: moderateScale(5),
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                      }}>
                      <Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{marginHorizontal: moderateScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <Text>Ears</Text>
                  </View>
                  <View style={{}}>
                    <Text> {selectedElephant?.ears?.replace('/,/g','\n')}</Text>
                  </View>

                  {earSelected ? (
                    <TouchableOpacity
                      onPress={() => setEarSelected(!earSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderColor: COLORS.GREEN,
                        borderRadius: moderateScale(5),
                      }}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../Assets/Images/Icons/checkBox.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setEarSelected(!earSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: moderateScale(5),
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                      }}>
                      <Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{marginHorizontal: moderateScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <Text>Tail</Text>
                  </View>
                  <View style={{}}>
                    <Text> {selectedElephant.tail}</Text>
                  </View>

                  {tailSelected ? (
                    <TouchableOpacity
                      onPress={() => setTailSelected(!tailSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderColor: COLORS.GREEN,
                        borderRadius: moderateScale(5),
                      }}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../Assets/Images/Icons/checkBox.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setTailSelected(!tailSelected)}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: moderateScale(5),
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                      }}>
                      <Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{marginHorizontal: moderateScale(20)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <Text>SpecialFeatures</Text>
                  </View>
                  <View style={{}}>
                    <Text> {selectedElephant?.specialFeatures}</Text>
                  </View>

                  {specialFeatureSelected ? (
                    <TouchableOpacity
                      onPress={() =>
                        setSpecialFeatureSelected(!specialFeatureSelected)
                      }
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderColor: COLORS.GREEN,
                        borderRadius: moderateScale(5),
                      }}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        source={require('../../Assets/Images/Icons/checkBox.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        setSpecialFeatureSelected(!specialFeatureSelected)
                      }
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: moderateScale(5),
                        borderWidth: 1,
                        borderColor: COLORS.GREEN,
                      }}>
                      <Text></Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: moderateScale(10),
                }}>
                <TouchableOpacity
                  onPress={() => setShowConfirmation(false)}
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
                  onPress={handleSubmit}
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
export default SelectedElephantScreen;
