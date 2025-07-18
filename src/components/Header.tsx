import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi"; // 👈 import the icon

const Header = () => {
    const { logout, user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !(dropdownRef.current as any).contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="p-5 flex justify-between items-center">
            <div className="flex space-x-12 relative items-center">
                <Link to="/dashboard" className="hover:underline font-semibold">
                    Dashboard
                </Link>

                {/* Clients Dropdown */}
                <div className="relative group">
                    <span className="flex items-center gap-1 cursor-pointer hover:underline font-semibold">
                        Clients <FiChevronDown className="text-sm" />
                    </span>
                    <div className="absolute top-full left-0 hidden group-hover:block bg-white border shadow rounded mt-1 p-2 z-10 w-40">
                        <div className="flex flex-col">
                            {user?.role === 'admin' && <Link to="/clients/add" className="px-4 py-2 hover:bg-gray-100 rounded">
                                Add Client
                            </Link>}
                            <Link to="/clients" className="px-4 py-2 hover:bg-gray-100 rounded">
                                View Clients
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Projects Dropdown */}
                <div className="relative group">
                    <span className="flex items-center gap-1 cursor-pointer hover:underline font-semibold">
                        Projects <FiChevronDown className="text-sm" />
                    </span>
                    <div className="absolute top-full left-0 hidden group-hover:block bg-white border shadow rounded mt-1 p-2 z-10 w-40">
                        <div className="flex flex-col">
                            {user?.role === 'admin' &&
                                <Link to="/projects/add" className="px-4 py-2 hover:bg-gray-100 rounded">
                                    Add Project
                                </Link>}
                            <Link to="/projects" className="px-4 py-2 hover:bg-gray-100 rounded">
                                View Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold focus:outline-none cursor-pointer hover:bg-gray-400"
                    title={user?.name || "User"}
                >
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded z-50 p-2">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => {
                                navigate("/profile");
                                setOpen(false);
                            }}
                        >
                            Profile
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-600 cursor-pointer"
                            onClick={() => {
                                logout();
                                setOpen(false);
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
