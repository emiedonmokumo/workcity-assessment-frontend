import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="">
            <h1 className="text-xl font-bold">Workcity Assessment (Frontend)</h1>
            <div className="mt-2 flex space-x-5">
                <Link to={'#'} className="bg-gray-200 p-2 px-5 rounded-md hover:bg-gray-300 cursor-pointer">Signup</Link>
                <Link to={'/auth/login'} className="bg-gray-200 p-2 px-5 rounded-md hover:bg-gray-300 cursor-pointer">Login</Link>
            </div>
        </main>
    );
};

export default Home;
