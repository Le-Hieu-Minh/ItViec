import { useEffect, useState } from "react";
import { getJob } from "../../Service/jobService";

function JobName(props) {
  const { record, onReload } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fecthApi = async () => {
      const response = await getJob(record.idJob);
      if (response) {
        onReload();
        setData([response]);
      }
    }
    fecthApi()
  }, [])


  console.log(data);

  return (
    <>
      {data.map(item => {
        return (
          <strong className="cvname" key={item.id}>{item.name}</strong>
        )
      })}
    </>
  );
}
export default JobName;