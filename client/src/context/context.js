import { useContext, createContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';
import {
  ADD_GROCERY_ITEM,
  HANDLE_FORM_CHANGE,
  LOGIN_USER,
  REGISTER_USER,
  GET_ALL_GROCERIES,
  DELETE_ALL_GROCERIES,
  DELETE_GROCERY_ITEM,
  SET_EDIT,
  UPDATE_GROCERY_ITEM,
  LOGOUT_USER,
} from './actions';

const localUser = JSON.parse(localStorage.getItem('user')) || {};
const localIsUserLoggedIn = localUser.name === undefined ? false : true;

const initialState = {
  user: localUser,
  grocery: [],
  inputValue: '',
  editId: '',
  isEditing: false,
  isUserLoggedIn: localIsUserLoggedIn,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Login user POST
  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/v1/users/login', {
        email,
        password,
      });
      dispatch({ type: LOGIN_USER, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Register user POST
  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post('/api/v1/users', {
        name,
        email,
        password,
      });
      dispatch({ type: REGISTER_USER, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER });
  };

  // Get All Groceries GET
  const getAllGroceries = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    try {
      const { data } = await axios.get('/api/v1/grocery', config);
      dispatch({ type: GET_ALL_GROCERIES, payload: data });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Add Grocery Item POST
  const addGroceryItem = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        '/api/v1/grocery',
        { value: state.inputValue },
        config
      );
      dispatch({ type: ADD_GROCERY_ITEM, payload: data });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Delet All Groceries DELETE
  const deleteAllGroceries = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    try {
      await axios.delete('/api/v1/grocery', config);
      dispatch({ type: DELETE_ALL_GROCERIES });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Delet Grocery Item DELETE
  const deleteGroceryItem = async (_id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    try {
      await axios.delete(`/api/v1/grocery/${_id}`, config);
      dispatch({ type: DELETE_GROCERY_ITEM, payload: _id });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Update Grocery Item PATCH
  const updateGroceryItem = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    try {
      await axios.patch(
        `/api/v1/grocery/${state.editId}`,
        { value: state.inputValue },
        config
      );
      dispatch({
        type: UPDATE_GROCERY_ITEM,
        payload: { _id: state.editId, value: state.inputValue },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleFormChange = (e) => {
    dispatch({ type: HANDLE_FORM_CHANGE, payload: e.target.value });
  };

  const setEdit = (_id, value) => {
    dispatch({ type: SET_EDIT, payload: { _id, value } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logoutUser,
        getAllGroceries,
        addGroceryItem,
        deleteAllGroceries,
        deleteGroceryItem,
        updateGroceryItem,
        handleFormChange,
        setEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
