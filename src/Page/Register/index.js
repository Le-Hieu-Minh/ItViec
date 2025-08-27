import { Button, Form, Input, notification } from "antd";
import generateToken from "../../helper/generateToken";
import { checkEmail, checkPhone, registerCompany } from "../../Service/jobService";
import { useNavigate } from "react-router";
import './register.scss';

function Register() {

  const [api, contextHolder] = notification.useNotification();

  const rules = [{ required: true, message: 'Bắt buộc nhập!' }];

  const navigate = useNavigate();

  const handleFinish = async (value) => {
    value.token = generateToken()

    const checkMmail = await checkEmail(value.email);
    const checkPhonee = await checkPhone(value.phone);

    if (checkMmail.length > 0) {
      api.error({
        message: 'Tồn tại email',
        description:
          'Email này đã được sử dụng, vui lòng chọn email khác.',
        duration: 3,
      });
    } else if (checkPhonee.length > 0) {
      api.error({
        message: 'Tồn tại phone',
        description:
          'Phone này đã được sử dụng, vui lòng chọn phone khác.',
        duration: 3,
      });
    } else {
      const response = await registerCompany(value);
      api.success({
        message: 'Đăng ký thành cong',
        description:
          'Công ty này đã đănng ký thành công.',
        duration: 3,
      });
      if (response) {
        navigate(`/login`)
      }
    }
  }



  return (
    <>
      <div className="register">
        <h2>Đăng ký tài khoản</h2>
        {contextHolder}
        <Form
          layout='vertical'
          name="formRegister"
          onFinish={handleFinish}>
          <Form.Item label='Tên công ty' name='companyName' rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label='Email' name='email' rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label='Số điện thoại' name='phone' rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={rules}>
            <Input.Password />
          </Form.Item>
          <Form.Item >
            <Button htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Register;