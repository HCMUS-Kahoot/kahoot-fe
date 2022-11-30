import axiosClient from "./axiosClient";

class GroupApi {
  createGroup = async (group) => {
    try {
      const res = await axiosClient.post("/groups", group);
      return res;
    } catch (error) {
      console.log("Create group error", error);
      return error;
    }
  };
  getGroups = async () => {
    try {
      const res = await axiosClient.get("/groups/current-user-groups");
      return res;
    } catch (error) {
      console.log("Get groups error", error);
      return error;
    }
  };
  updateGroup = async (id, group) => {
    try {
      const res = await axiosClient.put(`/groups/${id}`, group);
      console.log(res);
    } catch (error) {
      console.log("Update group error", error);
      return error;
    }
  };
  deleteGroup = async (id) => {
    try {
      const res = await axiosClient.delete(`/groups/${id}`);
      console.log(res);
    } catch (error) {
      console.log("Delete group error", error);
      return error;
    }
  };
}

const groupApi = new GroupApi();
export default groupApi;
