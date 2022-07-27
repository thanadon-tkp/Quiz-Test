import axios from "axios";

  axios.interceptors.request.use(async (config) => {
    const Token = await localStorage.getItem("token");
    if (Token !== null) {
      config.headers = {
          "Authorization": `Bearer ${Token}`
      }
    }
    config.url = config.url;
    return config;
  },(error) => {
    // Do something with request error
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
      return response;
    },
    async (error) => {
      console.log('fetchClient', error)
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          return axios_instance(config);
        }
      }
      return Promise.reject(error);
    }
  );

export const fetchClient = axios