import { combineReducers } from "redux-immutable";

import { reducer as playerReducer } from "../pages/Player/store/index";


export default combineReducers({
  player: playerReducer
});
