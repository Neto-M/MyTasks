'use client'

import { Context } from "@/context/UserContext"
import { useContext, useEffect } from "react"
import Image from "next/image"

export function Header() {
    const { authenticated, logout } = useContext(Context)

    return(
        <div>
            <header className="w-full h-14 flex justify-between bg-cyan-500 border-b">
                <Image
                    src= '/MyTasksLogo.png'
                    width={150}
                    height={100}
                    loading="eager"
                    alt= 'Logo MyTasks'
                    className="ml-5 pt-1.5"
                />
                {authenticated ? (
                    <p
                    onClick={logout}
                    className="
                        font-bold
                        mr-15
                        mt-4
                        text-lg
                        hover:text-white
                        hover:cursor-pointer
                    ">Sair</p>

                ) : ''}
            </header>
        </div>
    )
}