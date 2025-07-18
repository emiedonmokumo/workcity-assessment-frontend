import { useContext } from "react"
import ProfileForm from "../components/ProfileForm"
import { AuthContext } from "../context/AuthContext"

const Profile = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className="max-w-md w-full">
            <ProfileForm
                userData={user}
            />
        </div>
    )
}

export default Profile
