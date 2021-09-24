import * as actionTypes from "./actionTypes.js";

export const getExpenditures = () => {
  return async (dispatch, getState) => {
    fetch(`https://localhost:44352/api/Expenditure`)
      .then((response) => response.json())
      .then((resp) => {
        dispatch({
          type: actionTypes.GET_EXPENDITURES,
          payload: resp.data,
        });
      });
  };
};
