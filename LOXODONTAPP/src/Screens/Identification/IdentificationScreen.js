import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ImageBackground,
} from 'react-native';
import styles from './IdentificationScreen.styles';
import Header from '../../Components/Header';
import backButton from '../../Assets/Images/Icons/back.png';
import elephantIcon from '../../Assets/Images/Icons/elephant.png';
import outlined from '../../Assets/Images/Icons/outlined.png';
import checkbox from '../../Assets/Images/Icons/checkBox.png';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../Constants/AppConstants';
import ModalView from '../../Components/ModalView';

const IdentificationScreen = props => {

  const [showPopUp, setShowPop] = useState(false);
  const [tear, setTear] = useState(false);
  const [hole, setHole] = useState(false);
  const [mostTear, setMostTear] = useState(false);
  const [mostHole, setMostHole] = useState(false);
  const handlePopup = () => {
    setShowPop(true);
  };
  const handleConfirm = () => {
    setShowPop(false);
    const data = {
      mostProminentTear: tear,
      mostProminentHole: hole,
      secondMostProminentTear: mostTear,
      secondmMstProminentHole: mostHole,
    }
    props.navigation.push('SelectedElephantScreen', {selectedElephant:selectedElephant,popUpData:data});
  };
  const selectedElephant = props.route.params.item
    ? props.route.params.item
    : {};

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
      </View>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.contentContainer}>
            <View
              style={{
                minHeight: moderateScale(300),
                marginVertical: moderateScale(20),
              }}>
              <Image
                style={{
                  minHeight: moderateScale(300),
                  minWidth: '80%',
                }}
                source={elephantIcon}
              />
            </View>
            <ImageBackground
              style={{
                width: moderateScale(350),
                height: moderateScale(350),
              }}
              source={outlined}>
                {/* 1st section */}
              <View style={{flexDirection:'row',marginHorizontal:70,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>
              <View style={{flexDirection:'row',marginHorizontal:70,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>
              <View style={{flexDirection:'row',marginHorizontal:70,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:25
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              




              <View style={{flexDirection:'row',marginHorizontal:70,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(10),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:35
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(10),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:45
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              <View style={{flexDirection:'row',marginHorizontal:130,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(-30),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(-30),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              <View style={{flexDirection:'row',marginHorizontal:130,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(2),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(2),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>


              <View style={{flexDirection:'row',marginHorizontal:130,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(20),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:25
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

{/* left RIGHT */}
<View style={{flexDirection:'row',marginHorizontal:50,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(50),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:10
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(50),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              <View style={{flexDirection:'row',marginHorizontal:50,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(40),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:20
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(40),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:30
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              <View style={{flexDirection:'row',marginHorizontal:110,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(-10),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:10
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(-10),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:15
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>
              <View style={{flexDirection:'row',marginHorizontal:110,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(-50),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginLeft:10
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(10),
                    marginTop: moderateScale(-50),
                    width: moderateScale(10),
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:5,
                    marginRight:15
                  }}
                  onPress={() => handlePopup()}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>


              


            </ImageBackground>
            {/* <TouchableOpacity
              onPress={() => handlePopup()}
              style={{
                minHeight: moderateScale(300),
                marginVertical: moderateScale(20),
              }}>
              <Image
                style={{
                  minHeight: moderateScale(300),
                }}
                source={outlined}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showPopUp && (
          <ModalView visible={showPopUp}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.TRANSPARENT,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  minHeight: moderateScale(350),
                  minWidth: moderateScale(300),
                  backgroundColor: COLORS.TRANSPARENT_WHITE,
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
                      <Text>Most Prominent Tear</Text>
                    </View>

                    {tear ? (
                      <TouchableOpacity
                        onPress={() => setTear(!tear)}
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
                        onPress={() => setTear(!tear)}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      marginVertical: moderateScale(10),
                    }}>
                    <View>
                      <Text>Most Prominent Hole</Text>
                    </View>

                    {hole ? (
                      <TouchableOpacity
                        onPress={() => setHole(!hole)}
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
                        onPress={() => setHole(!hole)}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: moderateScale(10),
                    }}>
                    <View>
                      <Text>2nd Most Prominent Tear</Text>
                    </View>

                    {mostTear ? (
                      <TouchableOpacity
                        onPress={() => setMostTear(!mostTear)}
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
                        onPress={() => setMostTear(!mostTear)}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: moderateScale(10),
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text>2nd Most Prominent Hole</Text>
                    </View>

                    {mostHole ? (
                      <TouchableOpacity
                        onPress={() => setMostHole(!mostHole)}
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
                        onPress={() => setMostHole(!mostHole)}
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
                    onPress={handleConfirm}
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default IdentificationScreen;
