import {
  LOGIN_USER,
  REGISTER_USER,
  GET_ALL_GROCERIES,
  HANDLE_FORM_CHANGE,
  ADD_GROCERY_ITEM,
  DELETE_ALL_GROCERIES,
  DELETE_GROCERY_ITEM,
  SET_EDIT,
  UPDATE_GROCERY_ITEM,
  LOGOUT_USER,
} from './actions';

const reducer = (state, action) => {
  if (action.type === LOGIN_USER) {
    return { ...state, user: action.payload, isUserLoggedIn: true };
  }
  if (action.type === REGISTER_USER) {
    return { ...state, user: action.payload, isUserLoggedIn: true };
  }
  if (action.type === LOGOUT_USER) {
    return { ...state, user: {}, grocery: [], isUserLoggedIn: false };
  }
  if (action.type === GET_ALL_GROCERIES) {
    return { ...state, grocery: action.payload };
  }
  if (action.type === ADD_GROCERY_ITEM) {
    return {
      ...state,
      grocery: [...state.grocery, action.payload],
      inputValue: '',
    };
  }
  if (action.type === DELETE_ALL_GROCERIES) {
    return { ...state, grocery: [] };
  }
  if (action.type === DELETE_GROCERY_ITEM) {
    const grocery = state.grocery.filter((item) => item._id !== action.payload);
    return { ...state, grocery };
  }
  if (action.type === UPDATE_GROCERY_ITEM) {
    const grocery = state.grocery.map((item) => {
      if (item._id === action.payload._id) {
        item.value = action.payload.value;
      }
      return item;
    });
    return { ...state, grocery, editId: '', isEditing: false };
  }
  if (action.type === HANDLE_FORM_CHANGE) {
    return { ...state, inputValue: action.payload };
  }
  if (action.type === SET_EDIT) {
    return {
      ...state,
      isEditing: true,
      editId: action.payload._id,
      inputValue: action.payload.value,
    };
  }

  return { ...state };
};

export default reducer;
