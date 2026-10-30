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
            <section className="flex min-h-125 flex-col items-center justify-center gap-8 px-5 py-10 lg:flex-row lg:gap-16 lg:h-150 xl:h-200">
                <p className="w-full max-w-xs text-2xl font-bold">Sua lista de tarefas moderna. Verifique, atualize e exclua de forma prática!</p>
                <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col items-center">
                    <h1 className="text-3xl font-bold mb-5">Login</h1>
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