import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { checkLogin } from "../../action/login";
import { useSelector } from "react-redux";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.loginReducer)
  useEffect(() => {
    Cookies.remove('id');
    Cookies.remove('companyName');
    Cookies.remove('email');
    Cookies.remove('password');
    Cookies.remove('token');
    dispatch(checkLogin(false));
    navigate('/')
  }, [isLogin])
  return (
    <>
    </>
  );
}
export default Logout;