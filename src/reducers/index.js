import { combineReducers } from 'redux';
import data from './data';
import indicator from './indicator';
import error from './error';
import auth from './auth';

const AppReducer = combineReducers({
  data,
  indicator,
  error,
  auth,
});

export default AppReducer;