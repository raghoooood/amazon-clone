import { createContext, useReducer , useContext} from "react";
import reducer from "./reduser";
import { initialState } from "./reduser";

const GlobalContext = createContext();


const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
     value = {
         {
             basket: state.basket,
             user: state.user,
             dispatch: dispatch
         }
     }
     >
        {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useAuth = () => {
    return useContext(GlobalContext);
};