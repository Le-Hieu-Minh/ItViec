import { Button, Tooltip, Modal, Form, Row, Col, Input, Select, Switch, message } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { getSkill, getCity } from "../../Service/searchService";
import { updateJob } from "../../Service/companyService";

function EditJob(props) {
  const { record, onReload } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const rules = [{ required: true, message: 'Bắt buộc!' }];
  const [form] = Form.useForm();
  const [city, setCity] = useState();
  const [tag, setTag] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  form.setFieldsValue(record)

  const handleFinish = async (value) => {
    const result3 = await updateJob(record.id, value);
    if (result3) {
      form.setFieldsValue(result3);
      onReload();
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

  useEffect(() => {
    const fecthApi = async () => {
      const result1 = await getSkill();
      const result2 = await getCity();
      setCity(result2);
      setTag(result1);
    }
    fecthApi();
  }, []);

  return (
    <>
      {contextHolder}
      <Tooltip title='Sửa job'>
        <Button color="yellow" onClick={showModal} icon={<EditOutlined />}></Button >
      </Tooltip>
      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
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
            <Button className="btn-update" htmlType="submit">Cập nhập</Button>
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}
export default EditJob;