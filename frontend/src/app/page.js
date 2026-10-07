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
    }, [router, authenticated])

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return(
        <div>
            <section className="flex h-125 justify-between items-center">
                <p className="ml-52">AAAAAAAAAAAAAAAAAA</p>
                <form onSubmit={handleSubmit} className="mr-52">
                    <h1 className="text-center text-3xl mb-5 mr-5">Login</h1>
                    <Input
                        text= 'E-mail: '
                        type= 'email'
                        name= 'email'
                        placeholder= 'Digite o seu E-mail'
                        handleOnChange={handleChange}
                        value= {user.email}
                    />
                    <Input
                        text= 'Senha: '
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
                    <p>Não tem uma conta? <a href="/register" className="hover:text-cyan-500">Clique Aqui</a> para cadastrar-se.</p>
                </form>
            </section>
        </div>
    )
}