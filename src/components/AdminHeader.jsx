
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userManagmentSlice.js'; 

export default function AdminHeader() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const userState = useSelector((state) => state.user); // Get the whole user state
    const currentUser = userState?.currentUser; 
    // const userCount = useSelector((state) => state.userManagement.userCount);
    
      const handleSignOut = async () => {
        try {
          await fetch('/api/auth/signout');
          dispatch(signOut());
          navigate('/profile'); 
        } catch (error) {
          console.log(error);
        }
      };
      
    return (
        <div className='bg-slate-600 text-white'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/admin/home'>
                    <h1 className='font-bold uppercase'>Dashboard</h1>
                </Link>
                {/* <h1 >user count: {userCount} </h1> */}
                {currentUser && currentUser.isAdmin && (
                    <ul className='flex gap-4'>
                        <button 
                            onClick={handleSignOut} 
                            className='bg-red-500 text-white px-4 py-2 rounded-lg'
                        >
                            Exit
                        </button>
                    </ul>
                )}
            </div>
        </div>
    );
}
