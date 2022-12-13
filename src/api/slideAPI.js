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
        console.log("Get error", error);
        return error;
    }
  }
}
const slideApi = new SlideApi();
export default slideApi;