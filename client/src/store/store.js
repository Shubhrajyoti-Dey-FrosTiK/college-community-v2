import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import rootReducer from "../reducers/rootReducer.js";

export const store=createStore(rootReducer);

// Now we need to persist the store 
export const persister=persistStore(store)

export default { store, persister };
