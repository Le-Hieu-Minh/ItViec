import { Card } from "antd";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { getListCV } from "../../Service/companyService";

function ListCV() {
  const idCompany = Cookie.get('id');
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCV(idCompany);
      if (response) {
        let object = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        object.total = response.length;
        response.forEach(item => {
          item.statusRead ? (object.statusTrue++) : (object.statusFalse++);
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
          <Card title="CV" >
            <div className="cv-quantity">Số lượng cv:<strong>{item.total}</strong></div>
            <div className="cv-on">Cv đã đọc:<strong>{item.statusTrue}</strong></div>
            <div className="cv-off">Cv chưa đọc:<strong>{item.statusFalse}</strong></div>
          </Card>
        )
      })}


    </>
  )
}
export default ListCV;