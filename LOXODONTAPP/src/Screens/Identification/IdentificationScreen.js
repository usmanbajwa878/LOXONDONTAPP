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
import outlined from '../../Assets/Images/Icons/outlined.jpeg';
import checkbox from '../../Assets/Images/Icons/checkBox.png';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../Constants/AppConstants';
import ModalView from '../../Components/ModalView';

const IdentificationScreen = props => {
  console.log("Identification Screen Props",props)

  const [showPopUp, setShowPop] = useState(false);
  const [tear, setTear] = useState(false);
  const [hole, setHole] = useState(false);
  const [mostTear, setMostTear] = useState(false);
  const [mostHole, setMostHole] = useState(false);
  const [clickedValue,setClickedValue] = useState(null);
  const [earValues,setEarValues] = useState([]);
  const [featureValues,setFeatureValues] = useState([]);
  const [specialFeatures,setSpecialFeatures] = useState(false);
  const [selected,setSelected] = useState({
    leftear1:false,
    leftear2:false,
    leftear3:false,
    leftear4:false,
    leftear5:false,
    tuskT1:false,
    tuskT2:false,
    rightear7:false,
    rightear8:false,
    rightear9:false,
    rightear10:false,
    rightear11:false,
    leftFL:false,
    leftS:false,
    leftB:false,
    leftRL:false,
    rightFL:false,
    rightS:false,
    rightB:false,
    rightRL:false
  });

  const handlePopup = (itemSelected) => {
    console.log("itemSelected",itemSelected);
  //  const data =  itemSelected.split('-');
  //  console.log("data",data)
    setShowPop(true);
    setClickedValue(`${itemSelected}`);
    // setClickedValue(`${data[0]} ${data[1]}`);
  };
  const handleConfirm = () => {
    setShowPop(false);
    let itemElement =  clickedValue.split('-');
    itemElement = `${itemElement[0]} ${itemElement[1]}`;
    const data = {
      mostProminentTear: tear,
      mostProminentHole: hole,
      secondMostProminentTear: mostTear,
      secondmMstProminentHole: mostHole,
    }
    if(tear || mostTear){
      const element = `tear in ${itemElement}`;
      console.log("element",element);
      const isExists = earValues.findIndex(item=>item===element);
      console.log("isExists",isExists);
      if(isExists === -1){
        setEarValues([...earValues,element]);
      }
      setTear(false);
      setHole(false);
      setMostHole(false);
      setMostTear(false);
      setSpecialFeatures(false);
       
    } else if(hole || mostHole){
      const element = `hole in ${itemElement}`;
      const isExists = earValues.findIndex(item=>item===element);
      console.log("isExists",isExists);
      if(isExists === -1){
        setEarValues([...earValues,element]);
      }
      setTear(false);
      setHole(false);
      setMostHole(false);
      setMostTear(false);
      setSpecialFeatures(false);
    }
    else if(specialFeatures){
      const element = `hole in ${itemElement}`;
      const isExists = featureValues.findIndex(item=>item===element);
      console.log("isExists",isExists);
      if(isExists === -1){
        setFeatureValues([...featureValues,element]);
      }
      setTear(false);
      setHole(false);
      setMostHole(false);
      setMostTear(false);
      setSpecialFeatures(false);
    }
    
    else{
      setTear(false);
      setHole(false);
      setMostHole(false);
      setMostTear(false);
      setSpecialFeatures(false);
    };
   let refined = clickedValue.split('-');
   console.log("refined",refined)
   refined = `${refined[0]}`+`${refined[1]}`;
    console.log("refined",refined)
    console.log("data from popUp",data);
    console.log("clicked",itemElement);
    console.log("earValues",earValues);
    setSelected({[refined]:false});
    // props.navigation.push('SelectedElephantScreen', {selectedElephant:selectedElephant,popUpData:data});
  };

  const handleNext = ()=>{
    const item = props.route.params.item;
    item.ears = earValues.join(',');
    item.Date = new Date().toLocaleDateString();
    item.specialFeatures =  featureValues.join(',');
    console.log("ITEM",item);
    props.navigation.push('SelectedElephantScreen', {selectedElephant:item,popUpData:item});
  }
  const selectedElephant = props.route.params.item
    ? props.route.params.item
    : {};
console.log("selectedElephant",selectedElephant);
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
                  height: moderateScale(300),
                  width: moderateScale(100),
                }}
                source={{uri:selectedElephant.images[0]}}
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
                    backgroundColor: selected.rightear11 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(20),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightear11 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:40
                  }}
                  onPress={() => {
                    setSelected({rightear11:true})
                    handlePopup('rightear-11');

                  }}
                />
                <TouchableOpacity
                    style={{
                      backgroundColor: selected.leftear1 ? 'green' : 'transparent',
                      height: moderateScale(15),
                      marginTop: moderateScale(20),
                      width: moderateScale(15),
                      borderWidth:1,
                      borderColor:selected.leftear1 ? 'green' : 'transparent',
                      borderRadius:10,
                      marginRight:40
                    }}
                    onPress={() => {
                      setSelected({leftear1:true})
                      handlePopup('leftear-1');
  
                    }}
                />
              
              </View>
              <View style={{flexDirection:'row',marginHorizontal:70,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightear10 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(5),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightear10 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:30
                  }}
                  onPress={() => {
                    setSelected({rightear10:true})
                    handlePopup('rightear-10');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftear2 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(5),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftear2 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:20
                  }}
                  onPress={() => {
                    setSelected({leftear2:true})
                    handlePopup('leftear-2');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>
              <View style={{flexDirection:'row',marginHorizontal:70,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightear9 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(5),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightear9 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:20
                  }}
                  onPress={() => {
                    setSelected({rightear9:true})
                    handlePopup('rightear-9');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftear3 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(10),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftear3 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:25
                  }}
                  onPress={() => {
                    setSelected({leftear3:true})
                    handlePopup('leftear-3');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              




              <View style={{flexDirection:'row',marginHorizontal:70,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightear8 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(5),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightear8 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:35
                  }}
                  onPress={() => {
                    setSelected({rightear8:true})
                    handlePopup('rightear-8');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftear4 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(5),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftear4 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:45
                  }}
                  onPress={() => {
                    setSelected({leftear4:true})
                    handlePopup('leftear-4');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              {/* <View style={{flexDirection:'row',marginHorizontal:130,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'green',
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
                    backgroundColor: 'green',
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
              
              </View> */}

              <View style={{flexDirection:'row',marginHorizontal:130,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightear7 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(-7),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightear7 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:-10
                  }}
                  onPress={() => {
                    setSelected({rightear7:true})
                    handlePopup('rightear-7');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftear5 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(-5),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftear5 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:2
                  }}
                  onPress={() => {
                    setSelected({leftear5:true})
                    handlePopup('leftear-5');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>


              <View style={{flexDirection:'row',marginHorizontal:130,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.tuskT1 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(-15),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.tuskT1 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:35
                  }}
                  onPress={() => {
                    setSelected({tuskT1:true})
                    handlePopup('tusk-T1');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.tuskT2 ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(10),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.tuskT2 ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:-50,
                    marginRight:45
                  }}
                  onPress={() => {
                    setSelected({tuskT2:true})
                    handlePopup('tusk-T2');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

{/* left RIGHT */}
<View style={{flexDirection:'row',marginHorizontal:50,justifyContent:'space-between',marginTop:100}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftFL ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(50),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftFL ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:10
                  }}
                  onPress={() => {
                    setSelected({leftFL:true})
                    handlePopup('left-FL');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightFL ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(50),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightFL ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:20
                  }}
                  onPress={() => {
                    setSelected({rightFL:true})
                    handlePopup('right-FL');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              <View style={{flexDirection:'row',marginHorizontal:50,justifyContent:'space-between',marginTop:-70}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftS ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(0),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftS ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:45
                  }}
                  onPress={() => {
                    setSelected({leftS:true})
                    handlePopup('left-S');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightS ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(0),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightS ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:50
                  }}
                  onPress={() => {
                    setSelected({righS:true})
                    handlePopup('right-S');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>

              <View style={{flexDirection:'row',marginHorizontal:110,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftB ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(-12),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftB ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:25
                  }}
                  onPress={() => {
                    setSelected({leftB:true})
                    handlePopup('left-B');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightB ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(-12),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightB ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:30
                  }}
                  onPress={() => {
                    setSelected({rightB:true})
                    handlePopup('right-B');

                  }}
                  // onPress={() => alert('pressed head 2nd part')}
                />
              
              </View>
              <View style={{flexDirection:'row',marginHorizontal:110,justifyContent:'space-between',marginTop:100}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.leftRL ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(-70),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.leftRL ? 'green' : 'transparent',
                    borderRadius:10,
                    marginLeft:20
                  }}
                  onPress={() => {
                    setSelected({leftRL:true})
                    handlePopup('left-RL');

                  }}
                  // onPress={() => alert('pressed head left')}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: selected.rightRL ? 'green' : 'transparent',
                    height: moderateScale(15),
                    marginTop: moderateScale(-70),
                    width: moderateScale(15),
                    borderWidth:1,
                    borderColor:selected.rightRL ? 'green' : 'transparent',
                    borderRadius:10,
                    marginRight:30
                  }}
                  onPress={() => {
                    setSelected({rightRL:true})
                    handlePopup('right-RL');

                  }}
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
              onPress={handleNext}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: moderateScale(10),
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text>Special Features</Text>
                    </View>

                    {specialFeatures ? (
                      <TouchableOpacity
                        onPress={() => setSpecialFeatures(!specialFeatures)}
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
                      onPress={() => setSpecialFeatures(!specialFeatures)}
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
                    onPress={() => {
                      setShowPop(false)
                      setSelected(false)
                    }}
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
