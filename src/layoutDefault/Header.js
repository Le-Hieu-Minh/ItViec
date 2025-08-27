import { Layout, Button } from 'antd';
import logoIt from '../image/logo.webp';
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';

function Headers() {

  const { Header } = Layout;
  const navigate = useNavigate();
  const token = Cookies.get('token');
  console.log(token);


  return (
    <>
      <Header className='headerstyle'>
        <div className='header__logo ' >
          <img onClick={() => { navigate(`/`) }} src={logoIt} alt='logo' />
        </div>
        <div className='header__nav'>
          {token ? (
            <>
              <Button onClick={() => { navigate(`/dashboard`) }} className='btn-login'>Manage</Button>
              <Button onClick={() => { navigate(`/logout`) }} className='btn-login'>Logout</Button>
            </>

          ) : (
            <>
              <Button onClick={() => { navigate(`/login`) }} className='btn-login'>Login</Button>
              <Button onClick={() => { navigate(`/register`) }} className='btn-register'>Register</Button>
            </>

          )}


        </div>
      </Header>
    </>
  );
}
export default Headers;