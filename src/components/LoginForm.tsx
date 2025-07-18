const LoginForm = ({ userData, setUserData, submit }: any) => {
    return (
        <div>
            <div className="mb-5 flex flex-col space-y-3">
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Email Address</label>
                    <input
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        type="email"
                        placeholder="E.g. John Doe"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Password</label>
                    <input
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        type="password"
                        placeholder="*************"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
            </div>
            <button onClick={submit} className="w-80 bg-black text-white p-2 rounded-md">Login</button>
        </div>
    )
}

export default LoginForm
