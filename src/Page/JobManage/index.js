import { Button, Space } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import JobList from "../../Components/JobList";
import { useNavigate } from "react-router-dom";
import './jobmanage.scss';

function JobManage() {
  const navigate = useNavigate();
  return (
    <div className="job-manage">
      <Space direction="vertical">
        <h2>Danh sách việc làm</h2>
        <Button onClick={() => { navigate(`/createjob`) }} icon={<PlusCircleOutlined />}>Tạo việc làm mới</Button>
        <JobList />
      </Space>
    </div>
  );
}
export default JobManage;