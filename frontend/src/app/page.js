'use client'

import { Input } from "@/components/Input"
import { Context } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function Homepage() {
    const [ user, setUser ] = useState({email: '', password: ''})
    const { authenticated, login } = useContext(Context)
    const router = useRouter()

    useEffect(() => {
        if(authenticated) {
            router.push('/dashboard')
        }
    })

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return(
        <div className="flex">
            <h1>MyTasks</h1>
            <form onSubmit={handleSubmit} className="">
                <Input
                    text= 'E-mail'
                    type= 'email'
                    name= 'email'
                    placeholder= 'Digite o seu E-mail'
                    handleOnChange={handleChange}
                    value= {user.email}
                />
                <Input
                    text= 'Senha'
                    type= 'password'
                    name= 'password'
                    placeholder= 'Digite a sua Senha'
                    handleOnChange={handleChange}
                    value={user.password}
                />
                <Input
                    type= 'submit'
                    value= 'Entrar'
                />
                <p>Não tem uma conta? <a href="">Clique Aqui</a> para cadastrar-se.</p>
            </form>
        </div>
    )
}