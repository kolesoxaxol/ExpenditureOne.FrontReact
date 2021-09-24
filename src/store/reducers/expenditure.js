import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
};

const expenditures = (state, action) => {
  return { ...state, items: action.payload };
};

const expenditureReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXPENDITURES:
      return expenditures(state, action);

    default:
      return state;
  }
};

export default expenditureReducer;
