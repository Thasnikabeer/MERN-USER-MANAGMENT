import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function AdminPrivateRoute() {
  const { currentUser } = useSelector(state => state.user);

 if (currentUser && currentUser.isAdmin) {
  return <Outlet />;
} else {
  return <Navigate to='/admin/signin' />;
}
}