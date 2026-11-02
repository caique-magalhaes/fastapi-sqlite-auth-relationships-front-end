import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children, initialUser = null}) => {
    const [user, setUser] = useState(initialUser)

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext =  () => useContext(AuthContext)