import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
  } from '../redux/user/userManagmentSlice.js'

function AdminHome() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.userManagement);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart());
      try {
        const res = await fetch('/api/admin/users-data');
        const data = await res.json();
        dispatch(fetchUsersSuccess(data));
        setFilteredUsers(data);
      } catch (err) {
        dispatch(fetchUsersFailure(err.message));
      }
    };
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id.includes(searchTerm)
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

 
  const handleRemoveUser = async (userId) => {
    dispatch(deleteUserStart());
    try {
        const res = await fetch(`/api/admin/delete-user/${userId}`, {
            method: 'DELETE',
        });
        
        if (res.ok) {
            dispatch(deleteUserSuccess(userId));
        } else {
            const errorData = await res.json();
            dispatch(deleteUserFailure(errorData.message)); 
        }
    } catch (error) {
        dispatch(deleteUserFailure(error.message)); 
    }
};

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold text-center py-4 bg-blue-500 text-white">USERS LIST</h1>
        <div className="p-4 flex justify-between items-center">
          <div className="flex">
            <Link to={'/admin/add-newuser'}>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
                Add User
              </button>
            </Link>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search by username, email, or ID"
              className="bg-gray-200 px-3 py-2 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 transition duration-200">
              Search
            </button>
            
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">No data found</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={user.profilePicture} alt={user.username} className="h-10 w-10 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link to={`/admin/edit-userdata/${user._id}`}>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
