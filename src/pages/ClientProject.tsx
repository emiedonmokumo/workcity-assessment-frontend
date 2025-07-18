import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { useParams } from 'react-router-dom';

const ClientProjects = () => {
    const { id } = useParams()
    const { token } = useContext(AuthContext)
    const [projects, setProjects] = useState<any>([])

    // Fetch Projects in DB
    useEffect(() => {
        const fetchClients = async () => {
            try {
                if (token) {
                    const response = await axios.get(`/api/projects/client/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.status == 200) {
                        setProjects(response.data);
                    }
                }
            } catch (error) {
                console.error(error);
                alert('Failed to fetch clients');
            }
        }

        fetchClients();
    }, [token]);


    // Delete Project
    const onDelete = async (id: string) => {
        console.log(id)
        try {
            const response = await axios.delete(`/api/projects/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status == 204) {
                alert('Project Deleted!')
                setProjects(projects.filter((project: any) => project._id !== id))
            }
        } catch (error) {

        }
    }

    return (
        <div className='max-w-full'>
            <div className="flex gap-5">
                {projects.length > 0 ?
                    projects.map((project: any) => (
                        <div className=''>
                            <ProjectCard
                                id={project._id}
                                title={project.title}
                                description={project.description}
                                client={project.client}
                                budget={project.budget}
                                status={project.status}
                                key={project._id}
                                onDelete={onDelete}
                            />
                        </div>
                    )) : <h1>No Projects</h1>}
            </div>
        </div>
    )
}

export default ClientProjects
