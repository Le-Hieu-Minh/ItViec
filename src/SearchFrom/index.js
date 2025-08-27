import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { getCity } from "../Service/searchService";
import { useNavigate } from "react-router";

function SearchForm() {

  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fecthApi = async () => {
      const response = await getCity();
      if (response) {
        const searchAll = {
          key: 0,
          value: "All"
        }
        setCity([searchAll, ...response]);
      }
    }
    fecthApi();
  }, [])


  const handleFinish = (value) => {
    let city = value.city || '';
    city = value.city === 'All' ? '' : city;
    navigate(`/search?city=${city}&keyword=${value.keyword || ''}`);
  }

  return (
    <>
      <h1>100+ IT Jobs for Developers</h1>
      <Form onFinish={handleFinish}>
        <Row gutter={[10, 10]}>
          <Col xxl={6} xl={6} lg={6}>
            <Form.Item name='city'>
              <Select placeholder='Chọn thành phố' options={city} />
            </Form.Item>
          </Col>
          <Col xxl={13} xl={15} lg={15}>
            <Form.Item name='keyword'>
              <Input placeholder='Nhập từ khóa' />
            </Form.Item>
          </Col>
          <Col xxl={3} xl={3} lg={3}>
            <Form.Item>
              <Button className="btn-search" htmlType="submit" block> Tìm Kiếm</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default SearchForm;