import { get, patch, post } from "../Utils/request";
// import { post, get, del, patch } from "../Utils/request";


export const getListCV = async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
}

export const getListJOB = async (id) => {
  const result = await get(`jobs?idCompany=${id}`);
  return result;
}


export const changeStatusCv = async (id, data) => {
  const result = await patch(`cv`, id, data);
  return result;
}
export const updateCompany = async (id, data) => {
  const result = await patch(`company`, id, data);
  return result;
}
export const updateJob = async (id, data) => {
  const result = await patch(`jobs`, id, data);
  return result;
}

export const createJobs = async (option) => {
  const result = await post(`jobs`, option);
  return result;
}


// export const createRoom = async (option) => {
//   const result = await post(`rooms`, option);
//   return result;
// }


// export const deleteRoom = async (id) => {
//   const result = await del(`rooms`, id);
//   return result;
// }


// export const upDateRoom = async (id, data) => {
//   const result = await patch(`rooms`, id, data);
//   return result;
// }