import { Context } from "@/context/UserContext"
import api from "@/utils/api"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export default function Dashboard() {
    const { authenticated } = useContext(Context)
    const router = useRouter()
    const [titles, setTitles] = useState([])
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(() => {
        if(!authenticated) {
            router.push('/')
        }
    }, [router, authenticated])

    useEffect(() => {
        api.get('/title', {
            headers: {
                Authorization: `Bearer ${JSON.parser(token)}`
            }
        }).then((response) => {
            setTitles(response.data.title || [])
        }).catch(
            console.error('erro na tentativa de get /title', error)
        )
    }, [token])


    return(
        <div>

        </div>
    )
}