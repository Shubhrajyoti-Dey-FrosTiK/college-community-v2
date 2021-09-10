import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux';
import reducer from './index.js';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:"root",
    storage,
    whitelist : ['Bug']
}

const rootReducer = combineReducers({
	Bug : reducer
})

export default persistReducer(persistConfig,rootReducer);