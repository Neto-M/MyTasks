'use client'

import { Context } from "@/context/UserContext"
import api from "@/utils/api"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { Input } from "@/components/Input"

export default function Dashboard() {
    const { authenticated } = useContext(Context)
    const router = useRouter()
    const [titles, setTitles] = useState([])
    const [newTitle, setNewTitle] = useState([])
    const [tasks, setTasks] = useState([])
    const [token, setToken] = useState(null)
    const [isModalOpen, setModal] = useState(false)
    const config = {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }

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

        api.get('/title', config).then((response) => {
            setTitles(response.data.title || [])
        }).catch((error) => {
            console.error('erro na tentativa de get /title', error)
        })
    }, [token])

    function handleClickTitle(TitleId) {
        api.get(`/task/${TitleId}`, config).then((response) => {
            setTasks(response.data.task || [])
        }).catch((error) => {
            console.error('erro na tentativa de get /title', error)
        })
    }

    function handleClickTitleEdit(TitleId, newTitle) {}

    function handleClickTitleRemove(TitleId) {}

    function handleChangeNewTitle(e) {
        setNewTitle({...newTitle, [e.target.name]: e.target.value})
    }

    function handleSubmitTitle(e) {
        e.preventDefault()

        api.post('/title', newTitle, config)
        .then(() => api.get('/title', config))
        .then((response) => {
            setTitles(response.data.title)
            setNewTitle({})
            setModal(false)
        }).catch((error) => {
            console.log('Falha na tentativa de criar um novo Title', error)
        })

    }
    
    return(
        <div>
            <div className="">
                <button onClick={() => {
                    if(!isModalOpen) {
                        setModal(true)
                    } else (
                        setModal(false)
                    )
                }}>+</button>
                {isModalOpen && (
                    <form onSubmit={handleSubmitTitle}>
                        <Input
                            type= 'text'
                            name= 'title'
                            placeholder= 'Título'
                            value= {newTitle.title || ''}
                            handleOnChange= {handleChangeNewTitle}
                        />
                        <Input type='submit' value='Criar'/>
                    </form>
                )}
            </div>
            <div className="flex justify-between">
                <div className="w-1/2 border-3">
                    {titles.length > 0 && titles.map((title) => (
                        <div key={title.id} className="">
                            <ul>
                                <li onClick={() => {handleClickTitle(title.id)}}>{title.title}</li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="w-1/2 border-3">
                    {tasks.length > 0 && tasks.map((task) => (
                        <div key={task.id} className="">
                            <ul>
                                <li>{task.taskname}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}