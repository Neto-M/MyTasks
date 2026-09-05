'use client'

import api from '../utils/api'
import useFlashMessage from '../hooks/useFlashMessage'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()
    const { setFlashMessage } = useFlashMessage()


    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function login(user) {
        let msgText = 'Login realizado com sucesso!'
        let msgType = 'success'

        try {
            const response = await api.post('/login', user)
            const data = response.data

            await authUser(data)
        } catch (error) {
            msgText = 'Erro ao realizar o login'
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'


        try {
            const response = await api.post('/register', user)
            const data = response.data

            await authUser(data)
        } catch (error) {
            msgText = 'Erro ao tentar realizar o cadastro.'
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        if(!data || !data.token) {
            throw new Error('Token inválido recebido no servidor!')
        }

        setAuthenticated(true)
        api.defaults.headers.Authorization = `Bearer ${data.token}`
        localStorage.setItem('token', JSON.stringify(data.token))

        router.push('/dashboard')
    }

    function logout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined

        router.push('/')
    }

    return { authenticated, login, register, logout }

}