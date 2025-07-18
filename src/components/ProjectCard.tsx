import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiEdit } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';
import { FaTrash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

type ProjectProps = {
    id: string;
    title: string;
    description: string;
    client: any; // either ID or object with .name
    budget: number;
    status: string;
    onDelete: any
};

const ProjectCard: React.FC<ProjectProps> = ({
    id,
    title,
    description,
    client,
    budget,
    status,
    onDelete
}) => {
    const { user } = useContext(AuthContext);
    const projectInitial = title.charAt(0).toUpperCase();

    return (
        <div className="relative w-full max-w-md bg-white shadow border border-gray-200 rounded-xl p-5 pt-8 space-y-3">
            {/* Avatar-like cover badge */}
            <div className="absolute -top-4 left-4 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold shadow-md">
                {projectInitial}
            </div>

            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600">{description}</p>

            <div className="text-gray-700 text-sm flex items-center gap-2">
                <FiUser className="text-gray-500" />
                <span className="font-medium">Client:</span>
                <Link
                    to={`/projects/client/${client?._id || client}`}
                    className="text-blue-600 hover:underline"
                >
                    {client?.name || client}
                </Link>
            </div>

            <div className="text-gray-700 text-sm">
                <p>
                    <span className="font-medium">Budget:</span>{' '}
                    <span className="font-semibold text-lg">{formatPrice(budget)}</span>
                </p>

                <div className="mt-2 flex items-center justify-between">
                    <button
                        className={`capitalize ${status === 'pending' && 'text-yellow-500 font-bold'
                            }`}
                    >
                        {status}
                    </button>

                    {user?.role === 'admin' &&
                    <div className="flex gap-3 text-gray-600">
                        <Link
                            to={`/projects/${id}`}
                            className="hover:text-blue-600 transition-colors"
                        >
                            <FiEdit size={18} />
                        </Link>
                        <button
                            onClick={()=> onDelete(id)}
                            title="Delete"
                            className="hover:text-red-600 transition-colors cursor-pointer"
                        >
                            <FaTrash size={18} />
                        </button>
                    </div>}
                </div>
            </div>

        </div>
    );
};

export default ProjectCard;
