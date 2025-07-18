import ClientForm from "../components/ClientForm"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
    const navigate = useNavigate()
    const { token, user } = useContext(AuthContext);
    const [clientData, setClientData] = useState<any>({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/dashboard'); // or your home page
        }
    }, [user, navigate]);

    const handleSubmit = async () => {
        if (!clientData.name || !clientData.email || !clientData.phone || !clientData.address) {
            alert('Please fill all fields');
            return;
        }

        try {
            const response = await axios.post('/api/clients', clientData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                alert('Client added successfully');
                setClientData({
                    name: '',
                    email: '',
                    phone: '',
                    address: ''
                });
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error);
            alert('Failed to add client');
        }
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <ClientForm
                clientData={clientData}
                setClientData={setClientData}
                submit={handleSubmit}
            />
        </main>
    )
}

export default AddClient
