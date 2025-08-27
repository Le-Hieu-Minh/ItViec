import { Card } from "antd";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { getCompanyOne } from "../../Service/jobService";

function CompanyInfo() {
  const idCompany = Cookie.get('id');
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompanyOne(idCompany);
      setData([response]);
    }
    fetchApi();
  }, [])


  return (
    <>
      {data && data.map((item) => {
        return (
          <Card title="Info Company">
            <div className="company-name">Tên công ty:<strong>{item.companyName}</strong></div>
            <div className="company-email">Email:<strong>{item.email}</strong></div>
            <div className="company-phone">Số điện thoại:<strong>{item.phone}</strong></div>
            <div className="company-people">Số nhân viên:<strong>{item.quantityPeople}</strong></div>
          </Card>
        )
      })}


    </>
  )
}
export default CompanyInfo;