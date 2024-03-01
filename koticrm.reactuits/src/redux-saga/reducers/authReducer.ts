interface User {
  // Define the structure of your user object here
}

interface AuthState {
  user: User | null;
  error: string | null;
}

interface Action {
  type: string;
  payload?: User | string;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

const authReducer = (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload as User,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        error: action.payload as string,
      };
    default:
      return state;
  }
};

export default authReducer;
