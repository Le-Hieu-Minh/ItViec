function getCurrentTime() {
  const now = new Date();

  // Lấy ngày/tháng/năm
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
  const year = now.getFullYear();

  // Lấy giờ:phút:giây
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export default getCurrentTime;

