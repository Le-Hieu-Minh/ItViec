import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router";
import { login } from "../../Service/jobService";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { checkLogin } from "../../action/login";
import './login.scss';

function Login() {

  const [api, contextHolder] = notification.useNotification();

  const rules = [{ required: true, message: 'Bắt buộc nhập!' }];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (value) => {
    console.log(value);
    const response = await login(value.email, value.password);
    console.log(response);

    if (response.length > 0) {
      Cookies.set('id', response[0].id, { expires: 1 });
      Cookies.set('companyName', response[0].id, { expires: 1 });
      Cookies.set('email', response[0].companyName, { expires: 1 });
      Cookies.set('password', response[0].password, { expires: 1 });
      Cookies.set('token', response[0].token, { expires: 1 });
      dispatch(checkLogin(true));
      navigate(`/`);
    } else {
      api.error({
        message: 'Đăng nhập không thành công!',
        description:
          'Tài khoản hoặc mật khẩu không chính xác vui lòng đăng nhập lại.',
        duration: 3,
      });
    }

  }



  return (
    <>
      <div className="login">
        <h2>Đăng nhập</h2>
        {contextHolder}
        <Form
          layout='vertical'
          name="formLogin"
          onFinish={handleFinish}>
          <Form.Item label='Email' name='email' rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={rules}>
            <Input.Password />
          </Form.Item>
          <Form.Item >
            <Button htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Login;