import { Link, useNavigate } from "react-router-dom"
import SignupForm from "../components/SignupForm"
import { useContext, useEffect, useState } from "react"
import RoleSwitch from "../components/RoleSwitch"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Signup = () => {
    const navigate = useNavigate()
    const { login, isLoggedIn } = useContext(AuthContext)

    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: isAdmin ? 'admin' : 'user'
    })


    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard'); // or your home page
        }
    }, [isLoggedIn]);


    const handleSubmit = async () => {
        if (!userData.name || !userData.email || !userData.password) {
            alert('Please fill all fields');
            return;
        }
        try {
            const response = await axios.post('/api/auth/signup', userData);
            if (response.status === 201) {
                const { token, user, expiresAt } = response.data;
                login(token, user, expiresAt);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            alert('Signup failed');
        }
    };

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <div className="w-80 mb-3">
                <RoleSwitch checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
            </div>
            <SignupForm
                userData={userData}
                setUserData={setUserData}
                submit={handleSubmit}
            />
            <div className="flex justify-between w-80 mt-2">
                <h3>Already have account?</h3>
                <Link to={'/auth/login'} className="font-medium hover:underline">Login</Link>
            </div>
        </main>
    )
}

export default Signup
