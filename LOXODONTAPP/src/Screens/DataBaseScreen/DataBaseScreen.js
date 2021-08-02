import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './DataBaseScreen.styles';
import Header from '../../Components/Header';
import backButton from '../../Assets/Images/Icons/back.png';
import elephantIcon from '../../Assets/Images/Icons/elephant.png';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../Constants/AppConstants';
import {useSelector, useDispatch} from 'react-redux';

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

const renderItem = ({item}, handleSelected) => {
  return (
    <TouchableOpacity
      onPress={()=>handleSelected(item)}
      style={{
        flexDirection: 'row',
        maxHeight: moderateScale(220),
        marginVertical: moderateScale(10),
        justifyContent: 'space-between',
      }}>
      <View>
        {item.images.length > 0 ? (
          <View style={styles.itemImageContainer}>
            <Image
              resizeMethod="resize"
              resizeMode="cover"
              style={{
                maxWidth: moderateScale(100),
                maxHeight: moderateScale(320),
                minHeight: moderateScale(220),
              }}
              source={{uri: item.images[0]}}
            />
          </View>
        ) : (
          <View style={styles.itemImageContainer}>
            <Image
              resizeMethod="resize"
              resizeMode="cover"
              style={{
                maxWidth: moderateScale(100),
                maxHeight: moderateScale(320),
                minHeight: moderateScale(220),
              }}
              source={elephantIcon}
            />
          </View>
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
          {item.SpecialFeatures && (
            <Text style={{padding: 5, textAlign: 'center'}}>
              {item.SpecialFeatures}
            </Text>
          )}
          {!item.SpecialFeatures && (
            <Text
              style={{
                padding: 5,
                textAlign: 'center',
                color: COLORS.BODY_MUTED,
              }}>
              empty
            </Text>
          )}
        </View>
        <View style={styles.itemColouredLight}>
          <Text style={{padding: 5}}>Comments</Text>
          {item.comment && <Text style={{padding: 5}}>{item.comment}</Text>}
          {!item.comment && (
            <Text style={{padding: 5, color: COLORS.BODY_MUTED}}>empty</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DataBaseScreen = props => {
  console.log('props', props);

  const [elephantList, setElephantList] = useState([]);
  const [age, setAge] = useState('');
  const [ears, setEars] = useState('');
  const [gender, setGender] = useState('');
  const [tusks, setTusks] = useState('');
  const [specialFeatures, setSpecialFeatures] = useState('');
  const [reserveArea, setReserveArea] = useState('');

  useEffect(() => {
    if (elephantData && elephantList.length === 0) {
      console.log('CALLED');
      setElephantList(elephantData);
    }
  }, []);
  const dispatch = useDispatch();
  const elephantData = useSelector(state => state.elephant.elephantList);

  const handleSelected = (item) => {
    props.navigation.push('DataBaseFormScreen',{item:item});
  };
  const applyFiltering = (value, setValue, searchKey) => {
    console.log('value', value, searchKey);
    if (value) {
      const filteredData = elephantData.filter(item => {
        if (
          item[searchKey].toLowerCase().match(value) &&
          item.age.toLowerCase().match(age) &&
          item.tusks.toLowerCase().match(tusks) &&
          item.ears.toLowerCase().match(ears) &&
          item.gender.toLowerCase().match(gender)
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log('eple', filteredData);
      setElephantList(filteredData);
      setValue(value);
    } else {
      setValue(value);
      setElephantList(elephantData);
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
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: moderateScale(18),
              alignSelf: 'center',
              fontWeight: '600',
              color: COLORS.GREEN,
            }}>
            DataBase
          </Text>
        </View>
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

      <View style={styles.pickerContainers}>
        <View style={styles.pickerView}>
          <TextInput
            placeholderTextColor={COLORS.BODY_MUTED}
            style={styles.input}
            placeholder="Select Reserve/Area"
            onChangeText={text =>
              applyFiltering(text, setReserveArea, 'reserveArea')
            }
            value={reserveArea}
          />
        </View>
        <View style={{...styles.pickerView, minWidth: moderateScale(100)}}>
          <TextInput
            placeholderTextColor={COLORS.BODY_MUTED}
            style={styles.input}
            placeholder="Age"
            onChangeText={text => applyFiltering(text, setAge, 'age')}
            value={age}
          />
        </View>
        <View style={{...styles.pickerView, minWidth: moderateScale(100)}}>
          <TextInput
            placeholderTextColor={COLORS.BODY_MUTED}
            style={styles.input}
            placeholder="Ears"
            onChangeText={text => applyFiltering(text, setEars, 'ears')}
            value={ears}
          />
        </View>
        <View style={{...styles.pickerView, minWidth: moderateScale(100)}}>
          <TextInput
            placeholderTextColor={COLORS.BODY_MUTED}
            style={styles.input}
            placeholder="Gender"
            onChangeText={text => applyFiltering(text, setGender, 'gender')}
            value={gender}
          />
        </View>
        <View style={{...styles.pickerView, minWidth: moderateScale(100)}}>
          <TextInput
            placeholderTextColor={COLORS.BODY_MUTED}
            style={styles.input}
            placeholder="Tusks"
            onChangeText={text => applyFiltering(text, setTusks, 'tusks')}
            value={tusks}
          />
        </View>
        <View style={styles.pickerView}>
          <TextInput
            placeholderTextColor={COLORS.BODY_MUTED}
            style={styles.input}
            placeholder="Special Features"
            onChangeText={text =>
              applyFiltering(text, setSpecialFeatures, 'specialFeatures')
            }
            value={specialFeatures}
          />
        </View>
      </View>
      <Text
        style={{
          marginHorizontal: moderateScale(20),
          marginVertical: moderateScale(10),
        }}>{`Results (${elephantList.length})`}</Text>
      <View style={{flex: 1, marginHorizontal: moderateScale(20)}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={elephantList}
          renderItem={item => renderItem(item, handleSelected)}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
export default DataBaseScreen;
