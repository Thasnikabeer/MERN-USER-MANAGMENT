import  { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from '../redux/user/userManagmentSlice.js';

function EditUser() {
    const { id } = useParams(); // Get the user ID from the URL parameters
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        profilePicture: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`/api/admin/users-data/${id}`);
                if (!res.ok) throw new Error('Failed to fetch user data');
                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateUserStart());
        try {
            const res = await fetch(`/api/admin/update-user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!res.ok) throw new Error('Failed to update user');
            const updatedUser = await res.json();
            dispatch(updateUserSuccess(updatedUser));
            navigate('/admin/home'); // Redirect back to admin home after successful update
        } catch (error) {
            console.error('Error updating user:', error);
            dispatch(updateUserFailure(error.message)); // Dispatch failure action
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <h1 className="text-2xl font-bold text-center py-4 bg-blue-500 text-white">Edit User</h1>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            className="bg-gray-200 px-3 py-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="bg-gray-200 px-3 py-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Profile Picture URL</label>
                        <input
                            type="text"
                            name="profilePicture"
                            value={userData.profilePicture}
                            onChange={handleChange}
                            className="bg-gray-200 px-3 py-2 rounded-md w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        Update User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;