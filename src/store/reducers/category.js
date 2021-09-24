import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    options: []
};

const categories = (state, action) => {
    return { ...state, items: action.payload };
};

const categoriesOptions = (state, action) => {
    return { ...state, options: action.payload };
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return categories(state, action);
            case actionTypes.GET_CATEGORIES_OPTIONS:
                return categoriesOptions(state, action);
        default:
            return state;
    }
};

export default categoryReducer;