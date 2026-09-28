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
    const [selectedTitle, setSelectedTitle] = useState(null)
    const [editedTitle, setEditedTitle] = useState([])
    const [tasks, setTasks] = useState([])
    const [newTasks, setNewTasks] = useState([])
    const [token, setToken] = useState(null)
    const [isModalOpen, setModal] = useState(false)
    const [ isTitleClicked, setTitleClicked ] = useState(false) 
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
        const title = titles.find((title) => title.id === TitleId)
        setSelectedTitle(title || '')

        api.get(`/task/${TitleId}`, config).then((response) => {
            setTasks(response.data.task || [])
            setTitleClicked(false)
        }).catch((error) => {
            console.error('erro na tentativa de get /title', error)
        })
    }

    function handleChangeEditedTitle(e) {
        setEditedTitle({...editedTitle, [e.target.name]: e.target.value})
    }

    //A title está sendo atualizada porém apenas char. Eles não aparecem no input.

    function handleSubmitTitleEdit(e, TitleId) {
        e.preventDefault()

        api.patch(`/title/edit/${TitleId}`, editedTitle, config)
        .then(() => api.get('/title', config))
        .then((response) => {
            const updatedTitles = response.data.title
            setTitles(updatedTitles)
            const title = updatedTitles.find((title) => title.id === TitleId || null)
            setSelectedTitle(title || null)
            setEditedTitle({})
            setTitleClicked(false)
        }).catch((error) => {
            console.log('Falha na tentativa de patch do Title.', error)
        })
    }

    function handleClickTitleRemove(TitleId) {}

    function handleChangeNewTitle(e) {
        setNewTitle({...newTitle, [e.target.name]: e.target.value})
    }

    function handleSubmitNewTitle(e) {
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
            <div className="flex justify-between">
                <div className="w-1/2 border-3">
                    <div>
                        <h1>pesquisa</h1>
                        <div className="">
                            <button onClick={() => {
                                if(!isModalOpen) {
                                    setModal(true)
                                } else (
                                    setModal(false)
                                )
                            }}>+</button>
                            {isModalOpen && (
                                <form onSubmit={handleSubmitNewTitle}>
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
                    </div>
                    {titles.length > 0 && titles.map((title) => (
                        <div key={title.id} className="">
                            <ul>
                                <li onClick={() => {handleClickTitle(title.id)}}>{title.title}</li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="w-1/2 border-3">
                            <div>
                                <h1>Título e excluir</h1>
                                {isTitleClicked && (
                                    <form onSubmit={(e) => handleSubmitTitleEdit(e, selectedTitle?.id)}>
                                        <Input
                                            type= 'text'
                                            name= 'title'
                                            placeholder= {selectedTitle?.title || 'Sem Título'}
                                            handleOnChange= {handleChangeEditedTitle}
                                        />
                                    </form>
                                )}
                                {!isTitleClicked && (
                                    <h1 onClick={() => setTitleClicked(true)}>{selectedTitle?.title}</h1>
                                )}
                                
                            </div>
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