import { combineReducers } from 'redux';
import categoryReducer from './category';
import expenditureReducer from './expenditure';

export default combineReducers({
  categories: categoryReducer,
  expenditures: expenditureReducer
});
