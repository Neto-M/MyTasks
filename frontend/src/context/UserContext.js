'use client'

import { createContext } from "react"
import useAuth from "@/hooks/useAuth"

const Context = createContext()

function UserProvider({children}) {
    const { authenticated, login, register, logout } = useAuth()

    return(
        <Context.Provider value={{authenticated, login, register, logout}}>
            { children }
        </Context.Provider>
    )
}

export { Context, UserProvider }