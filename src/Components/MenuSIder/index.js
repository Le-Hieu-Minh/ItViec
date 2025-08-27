import { Menu } from 'antd';
import { UserOutlined, DashboardOutlined, PlusCircleOutlined, BarsOutlined, FileSyncOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';



function MenuSider() {
  const items = [
    {
      key: '/dashboard',
      label: <Link to='/dashboard'>Dash Board</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: '/infocompany',
      label: <Link to='/infocompany'>Info Company</Link>,
      icon: <UserOutlined />,

    },
    {
      key: '/jobmanage',
      label: <Link to='/jobmanage'>Job Manage</Link>,
      icon: <BarsOutlined />,

    },
    {
      key: '/cvmanage',
      label: <Link to='/cvmanage'>CV Manage</Link>,
      icon: <FileSyncOutlined />,

    },

  ];
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultOpenKeys={["/dashboard"]}

      />
    </>
  );
}
export default MenuSider;