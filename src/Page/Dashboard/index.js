import { Col, Row } from "antd";
import ListCV from "../../Components/ListCV";
import ListJob from "../../Components/LIstJob";
import CompanyInfo from "../../Components/CompanyInfo";
import './dashboard.scss';

function DashBoard() {

  return (
    <>
      <div className="dashboard">
        <h2 className="dashboard-title">Tổng Quan:</h2>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <ListJob />
          </Col>
          <Col span={8}>
            <ListCV />
          </Col>
          <Col span={8}>
            <CompanyInfo />
          </Col>
        </Row>
      </div>
    </>
  )
}
export default DashBoard;