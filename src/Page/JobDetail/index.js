import { useEffect, useState } from "react";
import { createCv, getCompanyOne, getJob } from "../../Service/jobService";
import { useParams } from "react-router";
import { Button, Card, Col, Form, Input, Row, Select, Tag, message } from "antd";
import { getCity } from "../../Service/searchService";
import { useNavigate } from "react-router";
import './jobdetail.scss'
import getCurrentTime from "../../helper/getTime";

function JobDetail() {

  const param = useParams();
  const [job, setJob] = useState([]);
  const [city, setCity] = useState([]);
  const rules = [{ required: true, message: 'Bắt buộc!' }]
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  useEffect(() => {
    const fecthApi = async () => {
      const response = await getJob(param.id);
      const listcity = await getCity();
      const listcompany = await getCompanyOne(response.idCompany)

      setCity(listcity);
      const newData = [{
        ...response,
        infoCompany: listcompany
      }]
      setJob(newData);

    }
    fecthApi();
  }, [param.id]);
  console.log(job);



  const handleFinish = async (value) => {

    value.idJob = job[0].id;
    value.createAt = getCurrentTime();
    value.idCompany = job[0].idCompany;
    value.statusRead = false;
    console.log(value);
    const response = await createCv(value);
    if (response) {
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Nộp cv thành công',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Nộp cv không thành công',
      });
    }
  }

  return (

    < div className="job-detail" >
      {contextHolder}
      <div className="job-header">
        <Button onClick={() => navigate(-1)} className="btn-back">Trở Lại</Button>
        <Button className="btn-apply" href="#formApply">Ứng Tuyển Ngay</Button>
      </div>

      {
        job && job.map(item => {
          return (
            <div className="job-content" key={item.id}>
              <h2 className="job-name">{item.name}</h2>
              <div className="job-tag">Tags:
                <strong>
                  {item.tags.map(itemTags => {
                    return (
                      <Tag key={itemTags} color="red">
                        {itemTags}
                      </Tag>
                    );
                  })}
                </strong>
              </div>
              <div className="job-city">Thành Phố:
                <strong>
                  {item.city.map(itemCity => {
                    return (
                      <Tag key={itemCity} color="volcano">
                        {itemCity}
                      </Tag>
                    );
                  })}
                </strong>
              </div>
              <div className="job-salary">Mức Lương:<strong>{item.salary}</strong></div>
              <div className="job-address">Địa Chỉ:<strong>{item.infoCompany.address}</strong></div>
              <div className="job-create">Thời Gian Đăng Bài:<strong>{item.createAt}</strong></div>
              <div className="job-description">Mô Tả Công Việc:
                <strong><p>{item.description}</p></strong>
              </div>
              <div className="company-description">Giới Thiệu Công Ty
                <strong><p>{item.infoCompany.description}</p></strong>
              </div>
            </div>
          );
        })
      }

      <Card title='Ứng Tuyển Ngay' id="formApply">
        <Form
          name="form-apply"
          layout="vertical"
          onFinish={handleFinish}
          form={form}
        >
          <Row gutter={[10, 10]}>

            <Col span={6}>
              <Form.Item label="Họ Tên" rules={rules} name='name'>
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Số Điện Thoại" rules={rules} name='phone'>
                <Input />
              </Form.Item >
            </Col>

            <Col span={6}>
              <Form.Item label="Email" rules={rules} name='email'>
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Thành Phố" rules={rules} name='city'>
                <Select options={city} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label='Giới Thiệu Bản Thân' rules={rules} name='description'>
                <Input.TextArea maxLength={100} rows={6} showCount />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='Danh Sách Project Đã Làm' rules={rules} name='linkProject'>
                <Input.TextArea maxLength={100} rows={6} showCount />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item >
                <Button className="btn-sendvalue" htmlType="submit">Gửi Yêu cầu</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </ div>
  );
}
export default JobDetail;