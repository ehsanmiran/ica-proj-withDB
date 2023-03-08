import { createContext, useState } from 'react';


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [authorized, setAuthorized] = useState(false)

    const login = () => {
        setAuthorized(true)
    }

    const logout = () => {
        setAuthorized(false)
    }

    return (
        <AuthContext.Provider value={{ authorized, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;