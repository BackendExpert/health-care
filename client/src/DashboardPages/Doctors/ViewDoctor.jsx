import React from 'react'
import { useParams } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const ViewDoctor = () => {
    const token = secureLocalStorage.getItem('login')
    const { id } = useParams()

    const [doctor, setdoctor] = useState(null)

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/doctor/view-doctor/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setdoctor(res.data.Result))
            .catch(err => console.log(err))
    }, [id])


    return (
        <div>ViewDoctor {id}</div>
    )
}

export default ViewDoctor