import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { AllCryptosReducer, SingleCryptosReducer, TrendingCryptoReducer } from "./reducers/CryptoReducer";
import { UserReducer } from "./reducers/UserReducer";

const reducer = combineReducers({
  trendingCrypto: TrendingCryptoReducer,
  allCrypto: AllCryptosReducer,
  singleCrypto: SingleCryptosReducer,
  user: UserReducer
});

const middleWare = [thunk];

let initialState = {};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
  
  export default store