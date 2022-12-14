import axiosClient from "./axiosClient";
class SlideApi {
  saveSlidesChange=async (presentationId, slides) => {
    try {
        const sentData={
          presentationId,
          slideContent: slides,
        }
        const res = await axiosClient.post(`/slides/createOrUpdateListOfSlides`,sentData);
        return res;
    } catch (error) {
        console.log("createOrUpdateListOfSlides error", error);
        return error;
    }
  }
  getSlideByPresentationId = async (presentationId) => {
    try {
        const res = await axiosClient.get(`/slides/getSlidesByPresentationId/${presentationId}`);
        return res;
    } catch (error) {
        console.log("Get error", error);
        return error;
    }
  }
  deleteSlide = async (id) => {
    try {
      console.log("This has been triggered")
      const res = await axiosClient.delete(`/slides/${id}`);
      console.log(res);
    } catch (error) {
      console.log("Delete slide error", error);
      return error;
    }
  };
}
const slideApi = new SlideApi();
export default slideApi;