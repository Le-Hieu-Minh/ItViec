import { Button, Card, Row, Col, Tag } from "antd";
import { useEffect, useState } from "react";
import { getCompanyOne, getListJob } from "../../Service/jobService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import './companydetail.scss'

function CompanyDetail() {
  const params = useParams();
  const [company, setCompany] = useState();
  const [job, setJob] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fecthApi = async () => {
      const response = await getCompanyOne(params.id);
      const listjob = await getListJob(params.id);
      setCompany([response]);


      setJob(listjob);
    }
    fecthApi()
  }, [params.id]);



  return (
    <>

      <div className="company-detail">
        <div className="company-header">
          <Button onClick={() => navigate(-1)} className="btn-back">Trở Lại</Button>
        </div>

        {
          company && company.map(item => {
            return (
              <div className="company-content" key={item.id}>
                <h2 className="company-companyName">{item.companyName}</h2>
                <div className="company-address">Địa Chỉ:<strong>{item.address}</strong></div>
                <div className="company-quantityPeople">Số Lượng Nhân Sự:<strong>{item.quantityPeople}</strong></div>
                <div className="company-workingTime">Thời Gian Làm Việc:<strong>{item.workingTime}</strong></div>
                <div className="company-website">Link Website:<strong>{item.website}</strong></div>
                <div className="company-description">Mô Tả Ngắn:<p><strong>{item.description}</strong></p></div>
                <div className="company-detail">Mô Tả Chi Tiết:<p><strong>{item.detail}</strong></p></div>

              </div>
            );
          })
        }
      </div>
      <h2 className="company-listjob">Danh Sách Các Job:</h2>

      <Row gutter={[10, 10]}>
        {job.map(item => (
          <Col span={12} key={item.id}>
            <Link to={`/jobdetail/${item.id}`}>
              <Card
                title={<Link to={`/jobdetail/${item.id}`} className="color">{item.name}</Link >}
              >
                <div className="mb-10">Ngôn ngữ:
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
                <div className="mb-10">Thành phố:
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
                <div className="mb-10">Lương: <strong>{item.salary}</strong></div>
                <div className="mb-10">Ngày Tạo: <strong>{item.createAt}</strong></div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>


    </>
  );
}
export default CompanyDetail;