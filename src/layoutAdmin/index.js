
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useState } from 'react';
import logo from '../image/logo.webp';
import logofold from '../image/logoFold.png';
import { Outlet, useNavigate } from "react-router";

import './layoutAdmin.scss';
import MenuSider from '../Components/MenuSIder';

function LayoutAdmin() {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Layout className='layoutAdmin'>
        <header className='header'>
          <div className={'header__logo ' + (collapsed && 'header__logo--collapsed')}>
            {collapsed ? (<img className='fold' src={logofold} />) : (<img className='logo' src={logo} />)}
          </div>
          <div className='header__nav'>
            <div className='header__nav--left'>
              <div className='header__collapse' onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <MenuUnfoldOutlined className='iconColor' /> : <MenuFoldOutlined className='iconColor' />}
              </div>
            </div>
            <div className='header__nav--right'>
              <Button onClick={() => { navigate(`/`) }} className='btn-TC'><HomeOutlined />Home</Button>
              <Button onClick={() => { navigate(`/logout`) }} className='btn-Logout'><PoweroffOutlined />Logout</Button>
            </div>
          </div>
        </header>
        <Layout className='layoutContent'>
          <Sider
            className='sider'
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint='lg'
          >
            <MenuSider />
          </Sider>

          <Content className='content'><Outlet /></Content>

        </Layout>
      </Layout >
    </>
  )
}
export default LayoutAdmin;