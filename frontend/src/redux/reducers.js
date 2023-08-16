// redux/reducers.js

import { SET_FACULTY_INFO } from './actions';

const initialState = {
  faculty: {
    image_url: '',
    name: '',
    role: '',
    department: '',
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FACULTY_INFO:
      return {
        ...state,
        faculty: action.payload,
      };
    // ...other cases for different actions
    default:
      return state;
  }
};

export default rootReducer;
