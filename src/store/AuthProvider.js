import {  useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider=(props)=>{
    const[token,setToken] = useState(null);

    const login=(token)=>{
        setToken(token);
        console.log(token);
    };

    const logout =()=>{
        setToken(null);
    }
    const authContextValue = {
        token: token,
        login: login,
        logout: logout,
      };

    return(
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;