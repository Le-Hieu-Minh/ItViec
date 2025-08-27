import { get, post, del } from "../Utils/request";

export const getJob = async (id) => {
  const result = await get(`jobs/${id}`);
  return result;
}

export const getListJob = async (id) => {
  const result = await get(`jobs?idCompany=${id}`);
  return result;
}
export const getCV = async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
}
export const getCvDetail = async (id) => {
  const result = await get(`cv?id=${id}`);
  return result;
}

export const getCompanyOne = async (id) => {
  const result = await get(`company/${id}`);
  return result;
}
export const createCv = async (option) => {
  const result = await post(`cv`, option);
  return result;
}
export const checkEmail = async (email) => {
  const result = await get(`company?email=${email}`);
  return result;
}

export const checkPhone = async (phone) => {
  const result = await get(`company?phone=${phone}`);
  return result;
}

export const registerCompany = async (option) => {
  const result = await post(`company`, option);
  return result;
}

export const login = async (email, password) => {
  const result = await get(`company?email=${email}&password=${password}`);
  return result;
}


export const deleteCv = async (id) => {
  const result = await del(`cv`, id);
  return result
}
export const deleteJob = async (id) => {
  const result = await del(`jobs`, id);
  return result
}
// export const deleteProduct = async (id) => {
//   const result = await del(`products`, id);
//   return result
// }

// export const editProduct = async (id, data) => {
//   const result = await patch(`products`, id, data);
//   return result;
// }