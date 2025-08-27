import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { deleteCv } from "../../Service/jobService";

function DeleteCv(props) {

  const { record, onReload } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const handleDelete = async (id) => {
    const response = await deleteCv(id);
    if (response) {
      messageApi.open({
        type: 'success',
        content: 'Xóa thành công',
      });
      onReload()
    } else {
      messageApi.open({
        type: 'error',
        content: 'Xóa thất bại',
      });
    }
  }
  return (
    <>
      {contextHolder}
      <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
        <Button icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  )
}
export default DeleteCv;