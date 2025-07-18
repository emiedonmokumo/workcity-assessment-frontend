import React from 'react';

type RoleSwitchProps = {
  checked: boolean; // true = Admin, false = User
  onChange: () => void;
};

const RoleSwitch: React.FC<RoleSwitchProps> = ({ checked, onChange }) => {
  return (
    <div
      className="w-full h-12 rounded-full bg-gray-300 relative flex items-center px-1 cursor-pointer"
      onClick={onChange}
    >
      {/* Knob */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white rounded-full shadow-md duration-300 ease-in-out
          ${checked ? 'left-[calc(50%+0.125rem)]' : 'left-1'}`}
      />

      {/* Labels */}
      <div className="flex justify-between w-full z-10 text-sm font-semibold text-gray-700">
        <span className={`w-1/2 text-center ${!checked ? 'text-black' : 'text-gray-500'}`}>User</span>
        <span className={`w-1/2 text-center ${checked ? 'text-black' : 'text-gray-500'}`}>Admin</span>
      </div>
    </div>
  );
};

export default RoleSwitch;
