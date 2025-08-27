import { Table, Tag, Tooltip, Button, Space } from "antd";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { getListJOB } from "../../Service/companyService";
import { EyeOutlined, } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './joblist.scss';
import EditJob from "../../Page/EditJob";
import DeleteJob from "../DeleteJob";

function JobList() {


  const columns = [
    {
      title: 'Tên job',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
    },
    {
      title: 'Mức lương($)',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Thời gian',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <>
            {record.status ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="red">Đang tắt</Tag>)}
          </>
        )
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        console.log(record);
        return (
          <Space direction="horizontal">
            <Tooltip title='Xem chi tiết'>
              <Button onClick={() => { navigate(`/detailjobadmin/${record.id}`) }} icon={<EyeOutlined />}></Button>
            </Tooltip>
            <EditJob record={record} onReload={handleReload} />
            <DeleteJob record={record} onReload={handleReload} />
          </Space>
        )
      }
    },
  ];


  const navigate = useNavigate();
  const idCompany = Cookie.get('id');
  const [data, setData] = useState();

  const fecthApi = async () => {
    const response = await getListJOB(idCompany);
    setData(response);
  }

  const handleReload = () => {
    fecthApi();
  };

  useEffect(() => {
    fecthApi();
  }, [])

  return (
    <div className="job-list">
      <Table dataSource={data} columns={columns} />;
    </div>
  )
}
export default JobList;