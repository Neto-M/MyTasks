'use client'

import { Context } from "@/context/UserContext"
import api from "@/utils/api"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"

export default function Dashboard() {
    const { authenticated } = useContext(Context)
    const router = useRouter()
    const [titles, setTitles] = useState([])
    const [tasks, setTasks] = useState([])
    const [token, setToken] = useState(null)

    useEffect(() => {
        if(!authenticated) {
            router.push('/')
        }
    }, [router, authenticated])

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    })

    useEffect(() => {
        if(!token) return

        api.get('/title', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setTitles(response.data.title || [])
        }).catch((error) => {
            console.error('erro na tentativa de get /title', error)
        })
    }, [token])

    function handleClickTitle(TitleId) {
        api.get(`/task/${TitleId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setTasks(response.data.task || [])
        }).catch((error) => {
            console.error('erro na tentativa de get /title', error)
        })
    }


    return(
        <div>
            <div>
                {titles.length > 0 && titles.map((title) => (
                    <div key={title.id}>
                        <ul>
                            <li onClick={title.id}>{title.title}</li>
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex inset-e-full">

            </div>
            
        </div>
    )
}