import { Card, Form, Row, Col, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { getCompanyOne } from "../../Service/jobService";
import { updateCompany } from "../../Service/companyService";

function InfoCompany() {

  const rules = [{ required: true, message: 'Bat buoc!' }];
  const [form] = Form.useForm();
  const [data, setData] = useState(true);
  const idCompany = Cookie.get('id');
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fecthApi = async () => {
      const response = await getCompanyOne(idCompany);
      form.setFieldsValue(response)
    }
    fecthApi();
  }, []);

  const handleFinish = async (values) => {
    const result = await updateCompany(idCompany, values);
    if (result) {
      form.setFieldsValue(result);
      setData(true);
      messageApi.open({
        type: 'success',
        content: 'Cập nhập thành công',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Cập nhập không thành công',
      });
    }
  }

  const handleEdit = () => {
    setData(false)
  }
  const handleCancle = () => {
    setData(true)
  }

  return (
    <div className="infoCompany">
      {contextHolder}
      <Card title='Thông tin công ty:' extra={<Button onClick={handleEdit}>Chỉnh Sửa</Button>}>
        <Form
          name="form-edit"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          disabled={data}
        >
          <Row gutter={[10, 10]} >
            <Col span={24}>
              <Form.Item name='companyName' label='Tên công ty' rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='email' label='Email' rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='phone' label='Số điện thoại'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='address' label='Địa chỉ'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='quantityPeople' label='Số lượng nhân sự'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='workingTime' label='Thời gian làm việc'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='website' label='Link website'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='Mô tả ngắn' name='description'>
                <Input.TextArea maxLength={200} rows={6} showCount />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='Mô tả chi tiết' name='detail'>
                <Input.TextArea maxLength={200} rows={6} showCount />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Row gutter={[10, 10]}>
                <Col>
                  <Form.Item >
                    <Button className="btn-update" htmlType="submit">Cập nhập</Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item >
                    <Button className="btn-cancle" onClick={handleCancle}>Hủy</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}
export default InfoCompany;