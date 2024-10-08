import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNewUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, email, password };

    try {
      const response = await fetch('/api/admin/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User added:', result);
        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/admin/home')
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-extrabold my-7 text-blue-900">
        ADD NEW USER
      </h1>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-slate-300 p-3 rounded-lg w-full"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-300 p-3 rounded-lg w-full"
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-300 p-3 rounded-lg w-full"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          ADD NEW USER
        </button>
      </form>
    </div>
  );
}

export default AddNewUser;
