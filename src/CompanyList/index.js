import { Card, Col, Row } from "antd";
import './companylist.scss';
import { useEffect, useState } from 'react';
import { getCompany } from "../Service/searchService";
import { Link } from "react-router-dom";


function CompanyList() {

  const [company, setCompany] = useState([]);
  useEffect(() => {
    const fecthApi = async () => {
      const response = await getCompany();
      setCompany(response);
    }
    fecthApi();
  }, []);

  return (
    <>
      <h2>Danh sách một số công ty</h2>
      <Row gutter={[10, 10]}>
        {company && (company || []).map(item => {
          return (
            <Col span={12} key={item.id} >
              <Link to={`/companydetail/${item.id}`}>
                <Card >
                  <div className="mb-10">Công ty:<strong>{item.companyName}</strong></div>
                  <div className="mb-10">Số nhân sự:<strong>{item.quantityPeople}</strong></div>
                  <div className="mb-10">Địa chỉ:<strong>{item.address}</strong></div>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
export default CompanyList;