import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function AdminSignin() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        let validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        return validationErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await res.json();
            
            if (!res.ok) { // Check for response status
                dispatch(signInFailure(data));
                return;
            }
            
            dispatch(signInSuccess(data));
            setFormData({ email: '', password: '' }); // Reset form data
            navigate('/admin/home');
        } catch (error) {
            dispatch(signInFailure(error));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7 uppercase">Admin SignIn</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-600">{errors.password}</p>}

                <button
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                
            </form>
            
            <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
        </div>
    );
}

export default AdminSignin;