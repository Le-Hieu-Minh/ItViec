import { Card } from "antd";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { getListJOB } from "../../Service/companyService";


function ListJob() {
  const idCompany = Cookie.get('id');
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJOB(idCompany);
      if (response) {
        let object = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        object.total = response.length;
        response.forEach(item => {
          item.status ? (object.statusTrue++) : (object.statusFalse++);
        });
        setData([object])
      }
    }
    fetchApi();
  }, [])


  return (
    <>
      {data && data.map((item) => {
        return (
          <Card title="Job">
            <div className="job-quantity">Số lượng job:<strong>{item.total}</strong></div>
            <div className="job-on">Job đang bặt:<strong>{item.statusTrue}</strong></div>
            <div className="job-off">Job đang tắt:<strong>{item.statusFalse}</strong></div>
          </Card>
        )
      })}


    </>
  )
}
export default ListJob;