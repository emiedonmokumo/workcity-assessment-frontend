import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const Project = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { token, user } = useContext(AuthContext);
    const [clients, setClients] = useState<any>([])

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
                    const response = await axios.get('/api/clients/', {
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


    // Fetch Project in DB
    useEffect(() => {
        const fetchClients = async () => {
            try {
                if (id && token) {
                    const response = await axios.get(`/api/projects/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.status == 200) {
                        setProject(response.data);
                        console.log(response.data)
                    }
                }
            } catch (error) {
                console.error(error);
                alert('Failed to fetch clients');
            }
        }

        fetchClients();
    }, [token])


    const handleUpdate = async () => {
        if (!project.title || !project.client) {
            alert('Title or Client is missing');
            return;
        }

        try {
            const response = await axios.put(`/api/projects/${id}`, project, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                alert('Project Updated successfully');
                navigate('/dashboard')
            }

        } catch (error) {
            console.error(error);
            alert('Failed to Update Project');
        }
    }

    return (
        <div className="max-w-full">
            {user?.role === 'admin' ?
                <ProjectForm
                    type={'update'}
                    clients={clients}
                    data={project}
                    setData={setProject}
                    submit={handleUpdate}
                /> : <h1>Admin Access</h1>
            }
        </div>
    )
}

export default Project
