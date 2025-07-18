import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const AddProject = () => {
    const navigate = useNavigate()
    const { token, user } = useContext(AuthContext);
    const [clients, setClients] = useState<any>([])

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/dashboard'); // or your home page
        }
    }, [user, navigate]);

    const [project, setProject] = useState<any>({
        title: '',
        description: '',
        client: '',
        budget: 0,
        status: 'pending'
    })

    // Fetch Clients in DB
    useEffect(() => {
        const fetchClients = async () => {
            try {
                if (token) {
                    const response = await axios.get('/api/clients', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.status == 200) {
                        setClients(response.data);
                    }
                }
            } catch (error) {
                console.error(error);
                alert('Failed to fetch clients');
            }
        }

        fetchClients();
    }, [token])

    const handleSubmit = async () => {
        if (!project.title || !project.client) {
            alert('Title or Client is missing');
            return;
        }

        try {
            const response = await axios.post('/api/projects', project, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                alert('Project added successfully');
                setProject({
                    title: '',
                    description: '',
                    client: '',
                    status: 'pending'
                });
                navigate('/dashboard')
            }

        } catch (error) {
            console.error(error);
            alert('Failed to add Project');
        }
    }

    return (
        <div className="max-w-full">
            {user?.role === 'admin' ?
                <ProjectForm
                    clients={clients}
                    data={project}
                    setData={setProject}
                    submit={handleSubmit}
                /> : <h1>Admin Access</h1>
            }
        </div>
    )
}

export default AddProject
