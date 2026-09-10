'use client'

import { Input } from "@/components/Input"
import { Context } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function Register() {
    const [ user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        confirmpassword: '',
    })
    const { authenticated, register } = useContext(Context)
    const router = useRouter()

    useEffect(() => {
        if(authenticated) {
            router.push('/dashboard')
        }
    }, [router, authenticated])

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return(
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit} className="">
                <Input
                    text= 'E-mail:'
                    type= 'email'
                    name= 'email'
                    placeholder= 'Digite o seu E-mail'
                    handleOnChange={handleChange}
                    value= {user.email}
                />
                <Input
                    text= 'Username:'
                    type= 'username'
                    name= 'username'
                    placeholder= 'Digite o seu Usuário'
                    handleOnChange={handleChange}
                    value={user.username}
                />
                <Input
                    text= 'Senha:'
                    type= 'password'
                    name= 'password'
                    placeholder= 'Digite a sua Senha'
                    handleOnChange={handleChange}
                    value={user.password}
                />
                <Input
                    text= 'Confirmação da Senha'
                    type= 'password'
                    name= 'confirmpassword'
                    placeholder= 'Confirme sua Senha'
                    handleOnChange={handleChange}
                    value={user.confirmpassword}
                />
                <Input
                    type= 'submit'
                    value= 'Cadastrar'
                />
                <p>Já tem conta? <a href="/">Clique Aqui</a> e faça o Login.</p>
            </form>           
        </div>
    )
}