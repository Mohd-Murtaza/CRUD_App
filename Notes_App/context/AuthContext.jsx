import React, {useState,createContext} from 'react';
export const Context=createContext();
const AuthContext = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
  return (
    <Context.Provider value={{isAuth,setIsAuth, isLogout, setIsLogout}}>
        {children}
    </Context.Provider>
  )
}

export default AuthContext
