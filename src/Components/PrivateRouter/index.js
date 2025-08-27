
import { Navigate, Outlet } from 'react-router-dom'
import Cookie from 'js-cookie';
import { useSelector } from "react-redux";



function PrivateRouter() {
  const token = Cookie.get('token');

  const isLogin = true
  // useSelector(state => state.LoginReducer);



  return (
    <>
      {(isLogin && token) ? (<Outlet />) : (<Navigate to='/login' />)}
    </>
  )
}
export default PrivateRouter;


