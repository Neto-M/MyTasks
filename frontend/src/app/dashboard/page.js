'use client'

import { Context } from "@/context/UserContext"
import api from "@/utils/api"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { Input } from "@/components/Input"

export default function Dashboard() {
    //CONFIG
    const { authenticated } = useContext(Context)
    const router = useRouter()
    const [token, setToken] = useState(null)
    //GET
    const [titles, setTitles] = useState([])
    const [selectedTitle, setSelectedTitle] = useState(null)
    const [tasks, setTasks] = useState([])
    const [search, setSearch] = useState('')
    //POST
    const [newTitle, setNewTitle] = useState([])
    const [newTask, setNewTask] = useState([])
    //PATCH
    const [editedTitle, setEditedTitle] = useState([])
    const [editedTask, setEditedTask] = useState([])
    //OTHERS
    const [isModalOpen, setModal] = useState(false)
    const [ isTitleClicked, setTitleClicked ] = useState(false)
    const [ isNewTaskClicked, setNewTaskClicked ] = useState(false)
    const [ isTaskClicked, setTaskClicked ] = useState(false)
    const [ editingTaskId, setEditingTaskId ] = useState(null)
    //AUTHORIZATION 
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

    //Titles

    function handleClickTitle(TitleId) {
        const title = titles.find((title) => title.id === TitleId)
        setSelectedTitle(title || '')

        api.get(`/task/${TitleId}`, config).then((response) => {
            setTasks(response.data.task || [])
            setTitleClicked(false)
            setEditingTaskId('')
            setNewTaskClicked(false)
        }).catch((error) => {
            console.error('erro na tentativa de get /title', error)
        })
    }

    function handleChangeEditedTitle(e) {
        setEditedTitle({...editedTitle, [e.target.name]: e.target.value})
    }

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

    function handleClickTitleRemove(TitleId) {
        if(window.confirm('Tem certeza que deseja excluir está tarefa?')) {
            api.delete(`/title/remove/${TitleId}`, config)
            .then(() => api.get('/title', config))
            .then((response) => {
                const titles = response.data.title
                setTitles(titles)
                setSelectedTitle({})
                setTitleClicked(false)
                setTasks({})
            }).catch((error) => {
                console.log('Falha na tentativa do delete do Title', error)
            })
        }
    }

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
    
    async function handleSubmitSearch(e) {
        e.preventDefault()

        try {
            const response = await api.get('/title/search', {
                ...config,
                params: { search }
            })
            setTitles(response.data.title)
        } catch (error) {
            console.error('Erro ao tentar pesquisar', error)
        }
    }

    function handleChangeSearch(e) {
        setSearch(e.target.value)
    }

    //Tasks

    function handleSubmitNewTask(e, TitleId) {
        e.preventDefault()

        api.post(`/task/${TitleId}`, newTask, config)
        .then(() => api.get(`/task/${TitleId}`, config))
        .then((response) => {
            setTasks(response.data.task || [])
            setNewTask({})
            setNewTaskClicked(false)
        })
    }

    function handleChangeNewTask(e) {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    function handleSubmitTaskEdit(e, TaskId, TitleId) {
        e.preventDefault()

        api.patch(`/task/edit/${TaskId}`, {taskname: editedTask}, config)
        .then(() => api.get(`/task/${TitleId}`, config))
        .then((response) => {
            setTasks(response.data.task || [])
            setEditedTask({})
            setEditingTaskId({})
        })
    }

    function handleChangeEditedTask(e) {
        setEditedTask(e.target.value)
    }

    function handleClickTaskRemove(TaskId, TitleId) {
        api.delete(`/task/remove/${TaskId}`, config)
        .then(() => api.get(`/task/${TitleId}`, config))
        .then((response) => {
            setTasks(response.data.task || [])
        }).catch((error) => {
            console.log('Falha na tentativa de remove do Task', error)
        })
    }

    
    return(
        <div>
            <div className="flex h-125 lg:h-150 xl:h-200 justify-between">
                <div className="w-full max-w-sm bg-gray-300 rounded-2xl overflow-x-hidden overflow-y-scroll scrollbar-thumb-cyan-500">
                    <div className="flex justify-between py-4 px-3">
                        <form onSubmit={(e) => handleSubmitSearch(e)}>
                            <input 
                                type="text" 
                                className="w-40 h-8 md:w-70 md:h-10 mr-3 md:mr-0 border rounded"
                                name="search"
                                placeholder="Pesquisar"
                                onChange={handleChangeSearch}
                            />
                        </form>
                        <div>
                            <button onClick={() => {
                                if(!isModalOpen) {
                                    setModal(true)
                                } else (
                                    setModal(false)
                                )
                            }} className="
                                h-8
                                w-8
                                shadow-2xl
                                rounded
                                bg-cyan-500
                                text-center
                                text-2xl
                                hover:bg-cyan-600
                                hover:cursor-pointer
                                mt-1">+</button>

                            {isModalOpen && (
                                <div className="
                                    fixed
                                    inset-0
                                    z-50
                                    flex
                                    items-center
                                    justify-center
                                    bg-black/60">
                                    <form onSubmit={handleSubmitNewTitle} className="
                                        flex
                                        flex-col
                                        w-70
                                        h-50
                                        rounded
                                        shadow-2xl
                                        bg-cyan-500">
                                        <button onClick={() => setModal(false)} className="
                                            h-8
                                            w-8
                                            text-center
                                            text-xl
                                            hover:cursor-pointer
                                            mt-1
                                            ml-60
                                            mb-5">
                                            X
                                        </button>
                                        <Input
                                            type= 'text'
                                            name= 'title'
                                            placeholder= 'Título'
                                            value= {newTitle.title || ''}
                                            handleOnChange= {handleChangeNewTitle}
                                        />
                                        <Input type='submit' value='Criar'/>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                    {titles.length > 0 && titles.map((title) => (
                        <div
                            key={title.id}
                            onClick={() => {handleClickTitle(title.id)}}
                            className="
                                relative
                                w-100
                                h-15
                                border-b
                                hover:bg-cyan-600
                                hover:cursor-pointer">
                                <ul>
                                    <li className="py-4 px-5 text-lg">{title.title}</li>
                                </ul>
                        </div>
                    ))}
                </div>
                <div className="w-full max-w-240 lg:max-w-4xl xl:max-w-375 overflow-x-hidden overflow-y-scroll scrollbar-thumb-cyan-500 bg-gray-300 rounded-2xl">
                    <div className="relative flex justify-between h-17.75">
                        {isTitleClicked && (
                            <form onSubmit={(e) => handleSubmitTitleEdit(e, selectedTitle?.id)}
                                className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 mt-2">
                                <Input
                                    type= 'text'
                                    name= 'title'
                                    placeholder= {selectedTitle?.title || 'Sem Título'}
                                    handleOnChange= {handleChangeEditedTitle}
                                />
                            </form>
                        )}
                        {!isTitleClicked && (
                            <h1 onClick={() => setTitleClicked(true)}
                                className=" absolute left-1/2 -translate-x-1/2 mt-5 text-2xl">
                                {selectedTitle?.title}
                            </h1>
                        )}
                        <button
                        onClick={() => {handleClickTitleRemove(selectedTitle?.id)}}
                        className="
                            absolute
                            right-3
                            sm:right-10
                            shadow-2xl
                            rounded
                            h-8
                            w-8
                            hover:cursor-pointer
                            bg-cyan-500
                            hover:bg-cyan-600
                            mt-5">
                            X
                        </button>
                    </div>
                    <div className="">
                        <button
                            onClick={() => {
                                if(!isNewTaskClicked) {
                                    setNewTaskClicked(true)
                                } else {
                                    setNewTaskClicked(false)
                                }
                            }} 
                            className="
                                rounded
                                shadow-2xl
                                h-8
                                w-25
                                hover:cursor-pointer
                                bg-cyan-500
                                hover:bg-cyan-600
                                ml-5
                                my-5
                            ">
                            Nova Tarefa    
                        </button>
                        {isNewTaskClicked && (
                            <form onSubmit={(e) => handleSubmitNewTask(e, selectedTitle?.id)}
                                className="flex self-baseline ml-8">
                                <Input
                                    type= 'text'
                                    name= 'taskname'
                                    placeholder= 'Nova Tarefa'
                                    handleOnChange={handleChangeNewTask}
                                />
                            </form>
                        )}
                    </div>
                    {tasks.length > 0 && tasks.map((task) => (
                        <div key={task.id} className="">
                            <ul className="relativo flex hover:bg-gray-400">
                                {editingTaskId === task.id ? (
                                    <form onSubmit={(e) => handleSubmitTaskEdit(e, task.id, selectedTitle?.id)}
                                        className="
                                            flex
                                            ml-8
                                            w-30
                                            sm:w-full
                                        ">
                                        <Input
                                            type= 'text'
                                            name= 'taskname'
                                            value= {editedTask}
                                            handleOnChange={handleChangeEditedTask}
                                        />
                                    </form>
                                ) : (
                                    <li onClick={() => {
                                        setEditingTaskId(task.id)
                                        setEditedTask(task.taskname)
                                    }} className="
                                        text-lg
                                        my-0.5
                                        ml-10
                                        w-30
                                        sm:w-full
                                    ">{task.taskname}</li>
                                )}
                                

                                <button
                                    onClick={() => {handleClickTaskRemove(task.id, selectedTitle?.id)}}
                                    className="
                                        hidden
                                        sm:block
                                        sm:mr-5
                                        hover:cursor-pointer
                                    ">
                                    X
                                </button>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}