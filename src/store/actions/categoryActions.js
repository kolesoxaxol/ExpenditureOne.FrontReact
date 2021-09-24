import * as actionTypes from "./actionTypes.js";

export const getCategories = () => {
  return async (dispatch, getState) => {
    fetch(`https://localhost:44352/api/Category`)
      .then((response) => response.json())
      .then((resp) => {
        dispatch({
          type: actionTypes.GET_CATEGORIES,
          payload: resp.data,
        });
      });
  };
};

export const getCategoriesOptions = () => {
  return async (dispatch, getState) => {
    fetch(`https://localhost:44352/api/Category`)
      .then((response) => response.json())
      .then((resp) => {
        let options = [];
        resp.data.map((item, key) =>
          options.push({
            value: item.id,
            displayValue: item.categoryName,
            key: key,
          })
        );
      
        dispatch({
          type: actionTypes.GET_CATEGORIES_OPTIONS,
          payload: options,
        });
      });
  };
};
