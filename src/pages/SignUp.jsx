import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() { 
     const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const validate = () => {
      let validationErrors = {};
  
      if (!formData.username) {
        validationErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        validationErrors.username = 'Username must be at least 3 characters long';
      }
  
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
        setLoading(true);
        setError(false);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
        navigate('/sign-in');
      } catch (error) {
        console.log(error)
        setLoading(false);
        setError(true);
      }
    };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 uppercase">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
         {errors.username && <p className="text-red-600">{errors.username}</p>}
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
         {errors.email && <p className="text-red-600">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-600">{errors.password}</p>}

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  );
}

export default SignUp;
