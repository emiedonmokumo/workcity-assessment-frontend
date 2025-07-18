import { Link, useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
    const navigate = useNavigate()
    const { login, isLoggedIn } = useContext(AuthContext)
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard'); // or your home page
        }
    }, [isLoggedIn]);


    const handleSubmit = async () => {
        if (!userData.email || !userData.password) {
            alert('Please fill all fields');
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', userData);
            if (response.status == 200) {
                const { token, user, expiresAt } = response.data;
                login(token, user, expiresAt);
                navigate('/dashboard');
            }

        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <LoginForm
                userData={userData}
                setUserData={setUserData}
                submit={handleSubmit}
            />
            <div className="flex justify-between w-80 mt-2">
                <h3>Don't have account?</h3>
                <Link to={'/auth/signup'} className="font-medium hover:underline">Signup</Link>
            </div>
        </main>
    )
}

export default Login
