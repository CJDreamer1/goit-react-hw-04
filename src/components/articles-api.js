import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const getArticles = async (topic, currentPage) => {
  const response = await axios.get(`/photos`, {
    params: {
      client_id: "HckNMPSQDS0G9c12XkQYeNdlDn8SwQhLo79hvgKC6eA",
      query: topic,
      page: currentPage,
      per_page: 10,
    },
  });
  console.log(response);
  return response.data;
};
