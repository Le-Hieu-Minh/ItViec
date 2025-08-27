import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

function Main() {

  const { Content } = Layout;
  return (
    <>
      <Content className='mainstyle'>
        <div className='container'>
          <Outlet />
        </div>
      </Content>
    </>
  );
}
export default Main;