import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import styles from './DataBaseAddScreen.styles';
import Header from '../../Components/Header';
import backButton from '../../Assets/Images/Icons/back.png';
import elephantIcon from '../../Assets/Images/Icons/elephant.png';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../Constants/AppConstants';
import {useEffect} from 'react';
import ModalView from '../../Components/ModalView';
import {useDispatch, useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {actionCreateElephant} from '../../Store/Actions/Elephant';

const listData = [
  {
    id: '1',
    Name: 'Bull',
    Gender: 'Bull',
    Age: 'Adult',
    Tusks: 'L Only',
    Tail: 'No Hair',
    Ears: 'Tear in 9\nHole in 3',
    SpecialFeatures: 'Left Rear Leg',
    Comment: 'Seen with Herd C',
  },
  {
    id: '2',
    Name: 'Bull',
    Gender: 'Bull',
    Age: 'Adult',
    Tusks: 'L Only',
    Tail: 'No Hair',
    Ears: 'Tear in 9\nHole in 3',
    SpecialFeatures: 'Left Rear Leg',
    Comment: 'Seen with Herd C',
  },
];
const showAddDatatoSelectedPopup = (item, props) => {
  return Alert.alert(
    '',
    `Are You sure You would like to add data to ${item.name} ?`,
    [
      {text: 'Cancel'},
      {
        text: 'Submit',
        onPress: () =>
          props.navigation.push('AddElephantScreen', {
            item: JSON.stringify(item),
            editable:true,
            userInteraction: true,
          }),
      },
    ],
  );
};


const renderItem = ({item}, props,handleShowTick) => {
  console.log("item",item);
  return (
    <TouchableOpacity
      onPress={() =>{
        handleShowTick(item)
        showAddDatatoSelectedPopup(item,props)
  
      }}
      style={{
        flexDirection: 'row',
        maxHeight: moderateScale(220),
        marginVertical: moderateScale(10),
        justifyContent: 'space-between',
      }}>
      <View style={styles.itemImageContainer}>
        {item.images && item.images.length > 0  && item.showTick === false ?  (
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            style={{
              width:100,
              height:220
              // maxWidth: moderateScale(100),
              // maxHeight: moderateScale(320),
              // minHeight: moderateScale(220),
            }}
            source={{uri: item.images[0]}}
          />
        )
      
        :
        item.images && item.images.length > 0 &&  item.showTick === true ? (
          <ImageBackground 
         resizeMethod="resize"
         resizeMode="cover"
          style={{
            width:100,
            height:220,
            justifyContent:'center'
            // maxWidth: moderateScale(100),
            // maxHeight: moderateScale(320),
            // minHeight: moderateScale(220),
          }}
          source={{uri: item.images[0]}}
          >
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width:100,
              height:50,
              backgroundColor:'transparent'
              // maxWidth: moderateScale(100),
              // maxHeight: moderateScale(320),
              // minHeight: moderateScale(220),
            }}
            source={require('../../Assets/Images/Icons/trueCheck.png')}
          />
          </ImageBackground>
        )
        :
        (
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width:100,
              height:220,
              // maxWidth: moderateScale(100),
              // maxHeight: moderateScale(320),
              // minHeight: moderateScale(220),
            }}
            source={elephantIcon}
          />
        )}
      </View>
      <View style={styles.itemContentContainer}>
        <View
          style={{
            flexDirection: 'row',
            height: moderateScale(30),
            backgroundColor: COLORS.GREEN,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{padding: 5, color: COLORS.WHITE}}>Name</Text>
          <Text style={{padding: 5, color: COLORS.WHITE}}>{item.name}</Text>
        </View>
        <View style={styles.itemColoured}>
          <Text style={{padding: 5}}>Gender</Text>
          <Text style={{padding: 5}}>{item.gender}</Text>
        </View>
        <View style={styles.itemColouredLight}>
          <Text style={{padding: 5}}>Age</Text>
          <Text style={{padding: 5}}>{item.age}</Text>
        </View>
        <View style={styles.itemColoured}>
          <Text style={{padding: 5}}>Tusks</Text>
          <Text style={{padding: 5}}>{item.tusks}</Text>
        </View>
        <View style={styles.itemColouredLight}>
          <Text style={{padding: 5}}>Ears</Text>
          <Text style={{padding: 5}}>{item.ears}</Text>
        </View>
        <View style={styles.itemColoured}>
          <Text style={{padding: 5}}>Special Features</Text>
          <Text style={{padding: 5, textAlign: 'center'}}>
            {item.SpecialFeatures}
          </Text>
        </View>
        <View style={styles.itemColouredLight}>
          <Text style={{padding: 5}}>Comments</Text>
          <Text style={{padding: 5}}>{item.comment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DataBaseAddScreen = props => {
  console.log('DataBase props', props);

  const [showPopUp, setShowPop] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showAddElephant, setShowAddElephant] = useState(false);
  const [elephantName, setElephantName] = useState('');
  const [showTick,setShowTick] = useState(false);
  const [elephantData,setElephantData] = useState([]);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const specificElephants = useSelector(
    state => state.elephant.specificElephants,
  );
 
 
  const USER_ID = useSelector(state => state.auth.user.userId);
  const user = useSelector(state => state.auth.user);
  const selectedElephant = props.route.params?.selectedElephant
    ? props.route.params?.selectedElephant
    : {};
  console.log('PROPS DATABSE ADD SCREEN', props);
  console.log('SPECIFIC ', specificElephants);
  console.log("elepahntData",elephantData)
const modifyData = ()=>{
  specificElephants?.map((item)=>item.showTick = false);
  setElephantData(specificElephants);
}

  useEffect(() => {
  modifyData();
    const popUptimer = setTimeout(() => {
      if (specificElephants && specificElephants.length === 0) {
        setShowAddButton(true);
      }
    }, 500);
    return () => clearTimeout(popUptimer);
  }, [props]);


  const handleAddElephant = async () => {
    const addedBy = {
      name: user[0].name,
      date: new Date(),
      userId: user[0].userId,
    };
    selectedElephant.name = elephantName;
    selectedElephant.userId = USER_ID;
    selectedElephant.addedBy = addedBy;

    console.log('INSIDE DATABASE ADD ELEPHANT', selectedElephant);
    try {
      if (netInfo.isConnected) {
        await dispatch(actionCreateElephant(selectedElephant));
        setShowPop(false);
        setShowAddElephant(false);
        props.navigation.push('SuccessScreen');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleShowTick = async(item)=>{
    const data =await JSON.parse(JSON.stringify(elephantData));
    const index =   data.findIndex(elephantitem=>elephantitem._id === item._id);
    console.log("INDEX",index);
    data.map((elItem)=>{
      if(elItem._id===item._id){
        elItem.showTick = !item.showTick
      }else {
        elItem.showTick = false
      }
      return elItem;
    })
    setElephantData(data);
    setElephantData(data);
    console.log("el",data)
  }

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
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: moderateScale(18),
              alignSelf: 'center',
              fontWeight: '600',
              color: COLORS.GREEN,
            }}>
            Results
          </Text>
        </View>
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
      {/* <TouchableOpacity
        onPress={() => props.navigation.push('AddElephantScreen')}
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
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems:'center',
          width: '100%',
        }}>
        <View>
          <Text
            style={{
              marginHorizontal: moderateScale(20),
              marginVertical: moderateScale(10),
              fontSize:18
            }}>
            {`Results (${specificElephants.length})`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowPop(true)}
          // onPress={() => props.navigation.push('AddElephantScreen')}
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
      </View>

      <View style={{flex: 1, marginHorizontal: moderateScale(20)}}>
        <FlatList
        extraData={elephantData}
          showsVerticalScrollIndicator={false}
          data={elephantData}
          renderItem={item => renderItem(item, props,handleShowTick)}
          keyExtractor={item => item.id}
        />
      </View>
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
                  Are you sure you would like to add new Elephant to the
                  database?
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
                  onPress={() => {
                    setShowPop(false);
                    setShowAddElephant(true);
                  }}
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
      {showAddElephant && (
        <ModalView visible={showAddElephant}>
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
                minWidth: moderateScale(300),
                backgroundColor: COLORS.WHITE,
                justifyContent: 'center',
                borderRadius: moderateScale(20),
                // justifyContent: 'center',
              }}>
              <Text>Please Name this Elephant</Text>
              <TextInput
                style={{
                  backgroundColor: COLORS.PALE_GREY,
                  borderRadius: 5,
                  marginVertical: moderateScale(10),
                  color: COLORS.BLACK,
                }}
                value={elephantName}
                placeholder="Type Name"
                placeholderTextColor={COLORS.BODY_MUTED}
                onChangeText={text => setElephantName(text)}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: moderateScale(10),
                }}>
                <TouchableOpacity
                  onPress={() => setShowAddElephant(false)}
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
                  onPress={handleAddElephant}
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
export default DataBaseAddScreen;
