import { Flex, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getSkill } from '../Service/searchService';
import { Link } from 'react-router-dom';


function SkillList() {

  const [skill, setSkill] = useState([]);

  useEffect(() => {
    const fecthApi = async () => {
      const response1 = await getSkill();
      setSkill(response1);
    }
    fecthApi();
  }, []);

  return (
    <>
      <Flex gap="small" wrap>
        {skill && (skill || []).map((item) => {
          return (
            <Link key={item.key} to={`/search?&keyword=${item.value}`}>
              <Tag color="red" >{item.value}</Tag>
            </Link>
          );
        })}
      </Flex>
    </>
  );
}
export default SkillList;