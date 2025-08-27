export const checkLogin = (status) => {
  console.log(status);

  return {
    type: 'CHECK_LOGIN',
    status: status
  }
}