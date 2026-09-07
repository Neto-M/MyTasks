'use client'

import { Context } from "@/context/UserContext"
import { useContext, useEffect } from "react"

export function Header() {
    const { authenticated, logout } = useContext(Context)

    return(
        <div>
            {authenticated ? (
                <header>
                    <h1>Logo MyTasks</h1>
                    <p>Sair</p>
                </header>
            ) : ''}
        </div>
    )
}