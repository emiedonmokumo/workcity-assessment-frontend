// src/components/ClientCard.tsx
import { useContext } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

type ClientProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  onDelete?: () => void;
};

const ClientCard: React.FC<ClientProps> = ({
  id,
  name,
  email,
  phone,
  address,
  onDelete,
}) => {
  const { user } = useContext(AuthContext)
  const clientInitial = name.charAt(0).toUpperCase();

  return (
    <div className="relative w-full max-w-xl bg-white shadow border border-gray-200 rounded-xl p-5 pt-8 space-y-3">
      {/* Avatar-like badge */}
      <div className="absolute -top-4 left-4 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold shadow-md">
        {clientInitial}
      </div>

      {/* Header row with name and icons */}
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>

        {user?.role === 'admin' &&
          <div className="flex gap-3 text-gray-600">
            <Link
              to={`/clients/${id}`}
              className="hover:text-blue-600 transition-colors"
            >
              <FiEdit size={18} />
            </Link>

            <button
              onClick={onDelete}
              className="hover:text-red-600 transition-colors cursor-pointer"
            >
              <FiTrash size={18} />
            </button>
          </div>}
      </div>

      <div className="text-gray-700 text-sm flex flex-col space-y-3">
        <p>
          <span className="font-medium">Email:</span> {email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {phone}
        </p>
        <p>
          <span className="font-medium">Address:</span> {address}
        </p>
      </div>
    </div>
  );
};

export default ClientCard;
