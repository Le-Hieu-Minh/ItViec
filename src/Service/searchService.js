import { get } from "../Utils/request";
// import { post, get, del, patch } from "../Utils/request";


export const getCity = async () => {
  const result = await get(`city`);
  return result;
}
export const getSkill = async () => {
  const result = await get(`tags`);
  return result;
}
export const getCompany = async () => {
  const result = await get(`company`);
  return result;
}
export const getAllJob = async () => {
  const result = await get(`jobs`);
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