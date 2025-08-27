import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJob } from "../../Service/jobService";
import { Tag } from "antd";
import './detailjobadmin.scss';

function DetailJobAdmin() {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fecthApi = async () => {
      const response = await getJob(params.id);
      setData([response]);
    }
    fecthApi();
  }, [])

  return (
    <>
      {
        data.map(item => {
          return (
            <div className='detailjobadmin'>
              <h2 className='job-name'>{item.name}</h2>
              <div className='job-status' >Trạng thái:<strong>{item.status ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="red">Đang tắt </Tag>)}</strong></div>
              <div className='job-tags' >Tags:
                <strong>
                  {item.tags.map(itemtag => {
                    return (
                      <Tag color="red">{itemtag}</Tag>
                    )
                  })}
                </strong>
              </div>
              <div className='job-salary' >Mức lương:<strong>{item.salary}</strong></div>
              <div className='job-createat' >Ngày tạo:<strong>{item.createAt}</strong></div>
              <div className='job-update' >Cập nhập:<strong>{item.updateAt}</strong></div>
              <div className='job-city' >Thành phố: <strong>
                {item.city.map(itemcity => {
                  return (
                    <Tag color="volcano">{itemcity}</Tag>
                  )
                })}
              </strong></div>
              <div className='job-description' >Mô tả:<p>{item.description}</p></div>
            </div>
          )
        })
      }
    </>

  )
}
export default DetailJobAdmin;