import React from "react";

const AuthContext = React.createContext(
   { 
    token: null,
    login:(token)=>{},
    logout:()=>{},
    isLoggedIn: ''
});

export default AuthContext;