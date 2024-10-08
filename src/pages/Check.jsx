// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { checkCount } from "../redux/user/CheckCounterSlice";

// function Check() {
//     const [users,setUsers]= useState([]);
//     const [error,setErrors]= useState(null)
//     const count =useSelector((state)=> state.check.count )
//     const dispatch=useDispatch()
//     useEffect(()=>{
//         const usersData = async()=>{
//             try{
//                 const res=await fetch('/api/admin/users-data')
//                 if(!res.ok){
//                     throw new Error('error')
//                 }
//                 const data=await res.json();
//                 setUsers(data)
//                 dispatch(checkCount(data));
//             }catch(err){
//                 setErrors(err.message);
//                 console.log(error)

                
//             }
//         }
//         usersData()
//     },[])
//   return (
//     <div>
//       <h1>User list</h1>


//       <h3> count: {count} </h3>
//       <ul>
//                 {users.map(user => (
//                     <li key={user._id}> 
//                         Name: {user.userName} --------email: {user.email}
//                     </li>
//                 ))}
//             </ul>
  
//     </div>
//   )
// }

// export default Check
