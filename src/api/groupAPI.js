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
  getGroupsWithTab = async (tab) => {
    try {
      if (tab === "myGroup") {
        const res = await axiosClient.get("/groups/current-user-groups");
        return res;
      }
      else if (tab === "groupImAdmin") {
        const res = await axiosClient.get("/groups/group-that-im-admin");
        return res;
      }
      else if (tab === "groupImCoOwner") {
        const res = await axiosClient.get("/groups/group-that-im-co-owner");
        return res;
      }
      else if (tab === "groupImIn") {
        const res = await axiosClient.get("/groups/group-that-im-member");
        return res;
      }
    } catch (error) {
      console.log("Get groups error", error);
      return error;
    }
  };

  invitationByEmail = async (data) => {
    try {
      const res = await axiosClient.post("/auth/sendInviteGroupEmail", data);
      return res;
    } catch (error) {
      console.log("Invitation by email error", error);
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

  getUserInGroup = async (data) => {
    try {
      const res = await axiosClient.get(`/groups/${data.id}/members`);
      return res;
    } catch (error) {
      console.log("Get user in group error", error);
      return error;
    }
  }
  acceptInvitaion = async (data) => {
    try {
      console.log(data)
      const res = await axiosClient.get(`/groups/${data.id}/invitations`);
      return res;
    } catch (error) {
      console.log("Accept invitation error", error);
      return error;
    }
  }
  deleteMember = async (data) => {
    try {
      const res = await axiosClient.delete(`/groups/${data.groupId}/members/${data.userId}`);
      return res;
    } catch (error) {
      console.log("Delete member error", error);
      return error;
    }
  }
  changeRole = async (data) => {
    try {
      const res = await axiosClient.put(`/group-members`, data);
      return res;
    } catch (error) {
      console.log("Change role error", error);
      return error;
    }
  }
  deleteUserInGroup = async (groupId, memberEmail) => {
    try {
      const res = await axiosClient.get(`/group-members/delete/${groupId}/${memberEmail}`);
      return res;
    } catch (error) {
      console.log("Delete member error", error);
      return error;
    }
  }
  deleteGroup = async (groupId) => {
    try {
      const res = await axiosClient.delete(`/groups/${groupId}`);
      return res;
    } catch (error) {
      console.log("Delete group error", error);
      return error;
    }
  }
  updateGroup = async (groupId, groupName, groupDescription) => {
    try {
      const res = await axiosClient.get(`/groups/edit/${groupId}/${groupName}/${groupDescription}`);
      return res;
    } catch (error) {
      console.log("Update group error", error);
      return error;
    }
  }
}

const groupApi = new GroupApi();
export default groupApi;
