// RegisterComponent.tsx

import React, { useState } from 'react';


interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const RegisterComponent: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    onRegister(username, password);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2"
      />
      <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register
      </button>
    </div>
  );
};

export default RegisterComponent;
