import React from "react";

const AuthContext = React.createContext(
   { 
    token: null,
    login:(token)=>{},
    logout:()=>{}
});

export default AuthContext;