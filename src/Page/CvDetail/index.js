import { Card, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import { getCvDetail, getJob } from "../../Service/jobService";
import { useNavigate, useParams } from "react-router-dom";
import './cvdetail.scss';
import { changeStatusCv } from "../../Service/companyService";



function CvDetail() {

  const [cv, setCv] = useState([]);
  const [job, setJobv] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fecthApi = async () => {
      const response = await getCvDetail(params.id);
      if (response) {
        const response2 = await getJob(response[0].idJob);
        setCv(response);
        setJobv([response2])

      }
      changeStatusCv(params.id, { statusRead: true })
    }
    fecthApi()
  }, [])

  return (
    <div className="cvdetail">
      <Button className="btn-back" onClick={() => navigate(-1)}>Quay lại</Button>
      {cv.map(item => {
        return (
          <div className="cv-person" key={item.id}>
            <Card title={`Ứng viên: ${item.name}`}>
              <div className='cv-createAt'>Ngày gửi:<strong>{item.createAt}</strong></div>
              <div className='cv-phone'>Số điện thoại:<strong>{item.phone}</strong></div>
              <div className='cv-email'>Email:<strong>{item.email}</strong></div>
              <div className='cv-city'>Thành phố<strong>{item.city}</strong></div>
              <div className='cv-description'>Mô tả:<strong><p>{item.description}</p></strong></div>
              <div className='cv-linkProject'>Link project:<strong><p>{item.linkProject}</p></strong></div>
            </Card>
          </div>
        );
      })}
      {job.map(item => {
        return (
          <div className="cv-job" >
            <Card title={`Thông tin Job: ${item.name}`}>
              <div className='cv-tags'>Tags:{item.tags.map(itemTags => {
                return (
                  <Tag key={itemTags} color="red">
                    {itemTags}
                  </Tag>
                );
              })}</div>
              <div className='cv-salary'>Lương:<strong>{item.salary}</strong></div>
              <div className='cv-description'><strong><p>{item.description}</p></strong></div>
            </Card>
          </div>
        );
      })}

    </div>
  )
}
export default CvDetail;