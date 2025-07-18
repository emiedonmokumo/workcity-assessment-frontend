import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './context/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import AddClient from './pages/AddClient'
import ProtectedLayout from './context/ProtectedLayout'
import Profile from './pages/Profile'
import Clients from './pages/Clients'
import AddProject from './pages/AddProject'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Client from './pages/Client'
import ClientProject from './pages/ClientProject'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/clients/add' element={<AddClient />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/clients/:id' element={<Client />} />
            <Route path='/projects/add' element={<AddProject />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:id' element={<Project />} />
            <Route path='/projects/client/:id' element={<ClientProject />} />

          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
