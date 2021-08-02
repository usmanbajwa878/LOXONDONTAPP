import { combineReducers } from 'redux';
import auth from './auth';
import elephant from './elephant';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth','navigation'] // only auth will be persisted;
  };



export const reducer = combineReducers({
    auth,
    elephant
})
export const persistedReducer = persistReducer(persistConfig, reducer)