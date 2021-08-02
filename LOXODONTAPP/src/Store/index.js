import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { reducer,persistedReducer } from "./Reducers";
import { persistStore } from 'redux-persist'




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
//   reducer,
  persistedReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
const persistor = persistStore(store)
// export default store;
export default {store,persistor}