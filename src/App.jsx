import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import PrivateRoute from './components/PrivateRoute';
import AdminSignin from './pages/AdminSignIn';
import AdminHome from './pages/AdminHome';
import AddNewUser from './pages/AddNewUser';
import EditUser from './pages/EditUser';
import Error from './pages/Error';
import AdminPrivateRoute from './components/AdminPrivateRoute';
// import Check from './pages/Check';

function App() {
  const isAdminRoute = location.pathname.startsWith("/admin");
  console.log(isAdminRoute)
  return (
   

    <BrowserRouter>
     {isAdminRoute ? <AdminHeader/> : <Header />}
      <Routes>
         

        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      
      
        
      
        <Route path="/admin/signin" element={<AdminSignin />} /> 
        {/* <Route path="/admin/home" element={<AdminHome />} />  */}
        <Route path="/admin/add-newuser" element={<AddNewUser/>} />
        <Route path="/admin/edit-userdata/:id" element={<EditUser />} />
        <Route element={<AdminPrivateRoute/>}>
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="*" element={<Error />}/>
        {/* <Route path='/check' element={<Check/>}/> */}
        </Route>  
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;