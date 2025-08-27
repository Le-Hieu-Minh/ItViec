import { Card, Col, Row, Tag } from "antd";
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from "react-router";
import { getAllJob, getCompany } from "../../Service/searchService";
import './search.scss';

function Search() {

  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const citySearch = searchParams.get('city') || '';
  const keywordSearch = searchParams.get('keyword') || '';

  useEffect(() => {
    const fecthApi = async () => {
      const response = await getAllJob();
      const listcompany = await getCompany();
      if (response) {
        const newData = response.filter(item => {
          const cityMatch = citySearch ? item.city?.some(c => c.toLowerCase().includes(citySearch.toLowerCase())) : true;

          const keywordMatch = keywordSearch
            ? item.tags?.some(tag => tag.toLowerCase().includes(keywordSearch.toLowerCase())) ||
            item.name?.toLowerCase().includes(keywordSearch.toLowerCase()) : true;

          return cityMatch && keywordMatch && item.status;
        });

        const all = newData.map(item => {
          const infocompany = listcompany.find(itemCompany => itemCompany.id === item.idCompany);
          return {
            ...item,
            infocompany
          }
        })

        console.log(all);

        setData(all.reverse());
      }
    };
    fecthApi();
  }, [citySearch, keywordSearch]);
  console.log(setSearchParams);

  return (
    <>
      <h3>Kết quả tìm kiếm:
        {citySearch && <Tag color='red'>{citySearch}</Tag>}
        {keywordSearch && <Tag color="volcano">{keywordSearch}</Tag>}
      </h3>
      <Row gutter={[10, 10]}>
        {data.map(item => (
          <Col span={12} key={item.id}>
            <Link to={`/jobdetail/${item.id}`}>
              <Card
                title={<Link to={`/jobdetail/${item.id}`} className="color">{item.name}</Link >}
              >
                <div className="mb-10">Ngôn ngữ:
                  <strong>
                    {item.tags.map(itemTags => {
                      return (
                        <Tag key={itemTags} color="red">
                          {itemTags}
                        </Tag>
                      );
                    })}
                  </strong>
                </div>
                <div className="mb-10">Thành phố:
                  <strong>
                    {item.city.map(itemCity => {
                      return (
                        <Tag key={itemCity} color="volcano">
                          {itemCity}
                        </Tag>
                      );
                    })}
                  </strong>
                </div>
                <div className="mb-10">Lương: <strong>{item.salary}</strong></div>
                <div className="mb-10">Công Ty: <strong>{item.infocompany.companyName}</strong></div>
                <div className="mb-10">Ngày Tạo: <strong>{item.createAt}</strong></div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default Search;