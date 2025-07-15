import { createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}) {


  const value = {};

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext};