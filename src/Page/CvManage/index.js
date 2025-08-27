import { Table, Tag, Tooltip, Button, Space } from "antd";
import JobName from "./JobName";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { getCV } from "../../Service/jobService";
import { EyeOutlined, } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './cvmanage.scss';
import DeleteCv from "../../Components/DeleteCV";

function CvManage() {

  const idCompany = Cookie.get('id');
  const [data, setData] = useState();
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Tên job',
      dataIndex: 'idJob',
      key: 'idJob',
      render: (_, record) => {
        return (
          <>
            <JobName record={record} onReload={handleReload} />
          </>
        )
      }
    },
    {
      title: 'Họ Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Trang thái',
      dataIndex: 'statusRead',
      key: 'statusRead',
      render: (_, record) => {
        return (
          <>
            {record.statusRead ? (<Tag color="green">Đã xem</Tag>) : (<Tag color="red">Chưa xem</Tag>)}
          </>
        )
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space direction="horizontal">
            <Tooltip title='Xem chi tiết'>
              <Button onClick={() => { navigate(`/cvdetail/${record.id}`) }} icon={<EyeOutlined />}></Button>
            </Tooltip>
            <DeleteCv record={record} onReload={handleReload} />
          </Space>
        )
      }
    },
  ];

  const fecthApi = async () => {
    const response = await getCV(idCompany);
    setData(response)
  }

  const handleReload = () => {
    fecthApi();
  };

  useEffect(() => {
    fecthApi();
  }, [])
  return (
    <div className="cvmanage">
      <h2 className="cv-title">Danh sách CV</h2>
      <Table dataSource={data} columns={columns} />;
    </div>
  );
}
export default CvManage;