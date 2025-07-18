import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import ClientForm from "../components/ClientForm"

const Client = () => {
    const navigate = useNavigate()
    const { token, user } = useContext(AuthContext)
    const [client, setClient] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const { id } = useParams()

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/dashboard'); // or your home page
        }
    }, [user, navigate]);
    

    // Fetch client
    useEffect(() => {
        const fetchClient = async () => {
            try {
                if (id && token) {
                    const response = await axios.get(`/api/clients/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (response.status == 200) {
                        setClient(response.data)
                    }
                }
            } catch (error) {
                console.log(error)
                alert('Error fetching client')
            }
        }

        fetchClient()
    }, [id])


    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/clients/${id}`, client, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                alert('Client updated successfully');
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error);
            alert('Failed to add client');
        }
    }


    return (
        <div>
            <ClientForm
                clientData={client}
                setClientData={setClient}
                submit={handleUpdate}
                type={'update'}
            />
        </div>
    )
}

export default Client
