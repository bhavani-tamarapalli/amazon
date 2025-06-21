import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  cart: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "LOGOUT":
      sessionStorage.removeItem("user");
      return { ...state, user: null, cart: [] };
    case "SET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
