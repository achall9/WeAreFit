import {combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersReducer, {UsersState} from './reducers/users';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['users', 'filters', 'search', 'events', 'checkout'],
  timeout: 0,
};

export type State = {
  users: UsersState;
};

export const allReducers = {
  users: usersReducer,
};

const rootReducer = combineReducers(allReducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
