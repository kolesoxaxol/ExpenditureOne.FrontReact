import * as actionTypes from "./actionTypes.js";
import { createAction } from "redux-actions";

export const getExpenditureRequest = createAction(
  actionTypes.GET_EXPENDITURES_REQUEST
);
export const getEpenditureSuccess = createAction(
  actionTypes.GET_EXPENDITURES_SUCCESS
);
export const getExpenditureFailure = createAction(
  actionTypes.GET_EXPENDITURES_FAILURE
);

export const getExpenditures = () => async (dispatch) => {
  dispatch(getExpenditureRequest());
  return fetch(`https://localhost:44352/api/Expenditure`)
    .then((response) => response.json())
    .then((resp) => {
      if(!resp || resp.data == null){
        return Promise.reject("resp.data is null");
      }
      dispatch(getEpenditureSuccess(resp.data));
      return resp;
    })
    .catch((error) => {
      dispatch(getExpenditureFailure(error));
    });
};

export const updateExpenditureRequest = createAction(
  actionTypes.UPDATE_EXPENDITURES_REQUEST
);
export const updateEpenditureSuccess = createAction(
  actionTypes.UPDATE_EXPENDITURES_SUCCESS
);
export const updateExpenditureFailure = createAction(
  actionTypes.UPDATE_EXPENDITURES_FAILURE
);

export const updateExpenditures =
  (expenditure, requestOptions) => (dispatch) => {
    dispatch(updateExpenditureRequest());
    return fetch(
      `https://localhost:44352/api/Expenditure/${expenditure.id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (!resp || resp.data === null) {
          return Promise.reject("resp.data is null");
        }
        dispatch(updateEpenditureSuccess(resp.data));
        dispatch(toggleEditPopup());
        return resp;
      })
      .catch((error) => {
        dispatch(updateExpenditureFailure(error));
        dispatch(toggleEditPopup());
      });
  };

export const removeExpenditureRequest = createAction(
  actionTypes.REMOVE_EXPENDITURE_REQUEST
);
export const removeEpenditureSuccess = createAction(
  actionTypes.REMOVE_EXPENDITURE_SUCCESS
);
export const removeExpenditureFailure = createAction(
  actionTypes.REMOVE_EXPENDITURE_FAILURE
);

export const removeExpenditure = (expenditureId, requestOptions) => (dispatch) => {
    dispatch(removeExpenditureRequest());

    fetch(`https://localhost:44352/api/Expenditure/${expenditureId}`, requestOptions)
      .then((response) => response.json())
      .then((resp) => {
        dispatch(removeEpenditureSuccess());
        dispatch(toggleRemovePopup());
      }).catch((error) => {
        dispatch(removeExpenditureFailure(error));
        dispatch(toggleRemovePopup());
      });
  };

  export const addExpenditureRequest = createAction(
    actionTypes.ADD_EXPENDITURE_REQUEST
  );
  export const addEpenditureSuccess = createAction(
    actionTypes.ADD_EXPENDITURE_SUCCESS
  );
  export const addExpenditureFailure = createAction(
    actionTypes.ADD_EXPENDITURE_FAILURE
  );
  
  export const addExpenditure = (expenditure, requestOptions) => (dispatch) => {
      dispatch(addExpenditureRequest());
  
      fetch(`https://localhost:44352/api/Expenditure`, requestOptions)
        .then((response) => response.json())
        .then((resp) => {
          dispatch(addEpenditureSuccess(resp.data));
          dispatch(toggleAddPopup());
        }).catch((error) => {
          dispatch(addExpenditureFailure(error));
          dispatch(toggleAddPopup());
        });
    };

export const setCurrentExpenditure = createAction(
  actionTypes.SET_CURRENT_EXPENDITURE
);
export const toggleEditPopup = createAction(actionTypes.TOGGLE_EDIT_POPUP);
export const toggleRemovePopup = createAction(actionTypes.TOGGLE_REMOVE_POPUP);
export const toggleAddPopup = createAction(actionTypes.TOGGLE_ADD_POPUP);
//redux-actions
export const filterExpenditures = createAction(actionTypes.FILTER_EXPENDITURES);

//without redux-actions
// export const filterExpenditures = (payload) => {
//   return {
//     type: actionTypes.FILTER_EXPENDITURES,
//     payload,
//   };
// };
