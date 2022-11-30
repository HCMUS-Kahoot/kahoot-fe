import axiosClient from "./axiosClient";

class ProfileApi {
    getProfileByUser = async (id) => {
        try {
            const res = await axiosClient.get(`/profiles/user/${id}`);
            return res;
        } catch (error) {
            console.log("Get error", error);
            return error;
        }
    };
    updateOrCreateByUserId = async (id, profile) => {
        try {
            const res = await axiosClient.post(`/profiles/user/${id}`, profile);
            console.log(res);
        } catch (error) {
            console.log("Update error", error);
            return error;
        }
    };
}

const profileApi = new ProfileApi();
export default profileApi;
