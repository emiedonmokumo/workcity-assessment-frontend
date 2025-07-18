import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ClientCard from "../components/ClientCard";

const Clients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const { token } = useContext(AuthContext);

  // Fetch clients in DB
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
  }, [token]);


  // Delete Project
  const onDelete = async (id: any) => {
    try {
      const response = await axios.delete(`/api/clients/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status == 204) {
        alert('Client Deleted!')
        setClients(clients.filter((client: any) => client._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='max-w-full'>
      <div className="flex gap-5">
        {clients.length > 0 ?
          clients.map(client => (
            <ClientCard
              id={client._id}
              name={client.name}
              email={client.email}
              phone={client.phone}
              address={client.address}
              key={client._id}
              onDelete={()=> onDelete(client._id)}
            />
          )) : <h1>No Client</h1>}
      </div>
    </div>
  )
}

export default Clients
