import { Button, Col, Form, Input, Row, Select, message, Switch, } from "antd";
import { useEffect, useState } from "react";
import { getCity, getSkill } from "../../Service/searchService";
import Cookie from 'js-cookie';
import getCurrentTime from "../../helper/getTime";
import { createJobs } from "../../Service/companyService";
import { useNavigate } from "react-router";
import './createjob.scss';

function CreateJob() {
  const [form] = Form.useForm();
  const rules = [{ required: true, message: 'Bắt buộc!' }];
  const [city, setCity] = useState();
  const [tag, setTag] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fecthApi = async () => {
      const result1 = await getSkill();
      const result2 = await getCity();
      setCity(result2);
      setTag(result1);
    }
    fecthApi();
  }, []);

  const handleFinish = async (value) => {
    value.idCompany = parseInt(Cookie.get('id'), 10);

    value.createAt = getCurrentTime();
    value.updateAt = getCurrentTime();
    console.log(value);

    const response = await createJobs(value);
    if (response) {
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Tạo job thành công',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Tạo job thất bại',
      });
    }

  }

  return (
    <div className="createjob">
      {contextHolder}
      <Button onClick={() => navigate(-1)} className="btn-createjob" >Trở lại</Button>
      <h2 className="createjob-title">Tạo job mới</h2>
      <Form
        name="form-createjob"
        layout="vertical"
        onFinish={handleFinish}
        form={form}
      >
        <Row gutter={[10, 10]}>

          <Col span={24}>
            <Form.Item label="Tên job" rules={rules} name='name'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item label="Tags" rules={rules} name='tags'>
              <Select mode="multiple" options={tag} />
            </Form.Item >
          </Col>

          <Col span={8}>
            <Form.Item label="Mức lương" rules={rules} name='salary'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Thành Phố" rules={rules} name='city'>
              <Select mode="multiple" options={city} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label='Mô tả' rules={rules} name='description'>
              <Input.TextArea maxLength={100} rows={6} showCount />
            </Form.Item>
          </Col>

          <Col span={5} >
            <Form.Item label='Trạng thái' name='status' initialValue={false} >
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item >
          <Button className="btn-sendvalue" htmlType="submit">Tạo mới</Button>
        </Form.Item>

      </Form>
    </div>
  )
}
export default CreateJob;