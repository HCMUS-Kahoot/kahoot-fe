import axiosClient from "./axiosClient";

class PresentationApi {
  createPresentation = async (presentation) => {
    try {
      console.log("This is presentation information: ", presentation);
      const res = await axiosClient.post("/presentations", presentation);
      return res;
    } catch (error) {
      console.log("Create presentation error", error);
      return error;
    }
  };
  getPresentations = async () => {
    try {
      const res = await axiosClient.get("/presentations/current-user-presentations");
      return res;
    } catch (error) {
      console.log("Get presentations error", error);
      return error;
    }
  };
  updatePresentation = async (id, presentation) => {
    try {
      const res = await axiosClient.put(`/presentations/${id}`, presentation);
      console.log(res);
    } catch (error) {
      console.log("Update presentation error", error);
      return error;
    }
  };
  deletePresentation = async (id) => {
    try {
      const res = await axiosClient.delete(`/presentations/${id}`);
      console.log(res);
    } catch (error) {
      console.log("Delete presentation error", error);
      return error;
    }
  };

  getUserInPresentation = async (data) => {
    try {
      const res = await axiosClient.get(`/presentations/${data.id}/members`);
      return res;
    } catch (error) {
      console.log("Get user in presentation error", error);
      return error;
    }
  }
  acceptInvitaion = async (data) => {
    try {
      console.log(data)
      const res = await axiosClient.get(`/presentations/${data.id}/invitations`);
      return res;
    } catch (error) {
      console.log("Accept invitation error", error);
      return error;
    }
  }
  deleteMember = async (data) => {
    try {
      const res = await axiosClient.delete(`/presentations/${data.presentationId}/members/${data.userId}`);
      return res;
    } catch (error) {
      console.log("Delete member error", error);
      return error;
    }
  }
  changeRole = async (data) => {
    try {
      const res = await axiosClient.put(`/presentation-members`, data);
      return res;
    } catch (error) {
      console.log("Change role error", error);
      return error;
    }
  }
  updatePresentation = async (id, data) => {
    try {
      const res = await axiosClient.put(`/presentations/${id}`, data);
      return res;
    }
    catch (error) {
      console.log("Update presentation error", error);
      return error;
    }
  }
  getPresentationById = async (id) => {
    try {
      const res = await axiosClient.get(`/presentations/${id}`);
      return res;
    } catch (error) {
      console.log("Get presentation by id error", error);
      return error;
    }
  }
  updatePresentationName = async (id, name) => {
    try {
      const res = await axiosClient.post(`/presentations/name/${id}/${name}`);
      return res;
    } catch (error) {
      console.log("Update presentation name error", error);
      return error;
    }
  }
}

const presentationApi = new PresentationApi();
export default presentationApi;
