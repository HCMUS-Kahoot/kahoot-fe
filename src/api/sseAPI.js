class SseApi {
  presentationNotify = () => {
    try {
      const sseUrl = `${process.env.REACT_APP_SSE_API_URL}/presentation`;
      const eventSource = new EventSource(sseUrl);
      eventSource.onmessage = (event) => {
        console.log(event);
      }
      return eventSource;
    } catch (error) {
      console.log("SSE error", error);
      return error;
    }
  };
}

const sseApi = new SseApi();
export default sseApi;
