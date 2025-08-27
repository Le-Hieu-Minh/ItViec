import './LayoutDefault.scss';
import Footers from "./Footer";
import Headers from "./Header";
import Main from "./Main";
import { Layout } from 'antd';

function LayoutDefault() {
  return (
    <>
      <Layout className='layoutstyle'>
        <Headers />
        <Main />
        <Footers />
      </Layout>

    </>
  );
}
export default LayoutDefault;