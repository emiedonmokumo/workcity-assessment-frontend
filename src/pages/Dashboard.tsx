import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
      <div className="max-w-full w-full">
        <h1 className="font-bold text-xl text-center">
          Welcome to Workcity Assessment Application (Frontend)
        </h1>
        <div className="flex space-x-5 mt-6 justify-center">
          <Link to={'/clients'} className="p-2 px-5 border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md">
            View Clients
          </Link>
          <Link to={'/projects'} className="p-2 px-5 border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md">
            View Projects
          </Link>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  