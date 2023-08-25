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

    return(
        <AuthContext.Provider value={{token,logout,login}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;