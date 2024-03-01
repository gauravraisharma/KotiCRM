import {
    FETCH_PERMISSIONS_REQUEST,
    FETCH_PERMISSIONS_SUCCESS,
    FETCH_PERMISSIONS_FAILURE,
  } from '../actions/permissionActions';
  
  // Define the initial state for permissions
  const initialState = {
    permissions: [],
    loading: false,
    error: null,
  };
  
  // Define the permission reducer function
  const permissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PERMISSIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PERMISSIONS_SUCCESS:
        return {
          ...state,
          permissions: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_PERMISSIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default permissionReducer;
  