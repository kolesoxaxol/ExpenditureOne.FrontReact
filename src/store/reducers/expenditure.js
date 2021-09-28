import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  isLoaded: false,
  error: null,
  currentItem: {},
  isShowEditPopup: false,
  isShowRemovePopup: false,
  isShowAddPopup: false,
};

const filterExpenditures = (state, action) => {
  return { ...state, filteredItems: action.payload };
};

const expenditureReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXPENDITURES_REQUEST:
      return { ...state, loading: true, isLoaded: false };

    case actionTypes.GET_EXPENDITURES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload,
        loading: false,
        isLoaded: true,
      };

    case actionTypes.GET_EXPENDITURES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoaded: true,
      };

    case actionTypes.UPDATE_EXPENDITURES_REQUEST:
      return { ...state, loading: true, isLoaded: false };

    case actionTypes.UPDATE_EXPENDITURES_SUCCESS: {
      const atIndex = state.items.findIndex(
        (item) => item.id === state.currentItem.id
      );

      const updateExpenditures = [
        ...state.items.slice(0, atIndex),
        { ...action.payload },
        ...state.items.slice(atIndex + 1),
      ];

      return {
        ...state,
        items: updateExpenditures,
        //TODO: rework filteredItems
        filteredItems: updateExpenditures,
        loading: false,
        isLoaded: true,
      };
    }

    case actionTypes.UPDATE_EXPENDITURES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoaded: true,
      };
    //ADD
    case actionTypes.ADD_EXPENDITURE_REQUEST:
      return { ...state, loading: true, isLoaded: false };

    case actionTypes.ADD_EXPENDITURE_SUCCESS: {
      const updateExpenditures = [
        ...state.items,
        {
          title: action.payload.title,
          description: action.payload.description,
          dateOfExpenditure: action.payload.dateOfExpenditure,
        },
      ];

      return {
        ...state,
        items: updateExpenditures,
        //TODO: rework filteredItems
        filteredItems: updateExpenditures,
        loading: false,
        isLoaded: true,
      };
    }

    case actionTypes.ADD_EXPENDITURE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoaded: true,
      };

    //Remove
    case actionTypes.REMOVE_EXPENDITURE_REQUEST:
      return { ...state, loading: true, isLoaded: false };

    case actionTypes.REMOVE_EXPENDITURE_SUCCESS: {
      const atIndex = state.items.findIndex(
        (cat) => cat.id === state.currentItem.id
      );

      const updateExpenditures = [
        ...state.items.slice(0, atIndex),
        ...state.items.slice(atIndex + 1),
      ];

      return {
        ...state,
        items: updateExpenditures,
        //TODO: rework filteredItems
        filteredItems: updateExpenditures,
        loading: false,
        isLoaded: true,
      };
    }

    case actionTypes.REMOVE_EXPENDITURE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoaded: true,
      };

    case actionTypes.FILTER_EXPENDITURES:
      return filterExpenditures(state, action);

    case actionTypes.SET_CURRENT_EXPENDITURE:
      return {
        ...state,
        currentItem: { ...state.currentItem, ...action.payload },
      };

    case actionTypes.TOGGLE_EDIT_POPUP:
      return { ...state, isShowEditPopup: !state.isShowEditPopup };

    case actionTypes.TOGGLE_REMOVE_POPUP:
      return { ...state, isShowRemovePopup: !state.isShowRemovePopup };

    case actionTypes.TOGGLE_ADD_POPUP:
      return { ...state, isShowAddPopup: !state.isShowAddPopup };

    default:
      return state;
  }
};

export default expenditureReducer;
