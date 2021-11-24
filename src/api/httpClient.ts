import axios from "axios";

const post = (url: any, data:any, config = {}) => {
  return axios.post(url, data, config);
};

const get = (url:string) => {
  return axios(url);
};

const HttpClient = {
  post,
  get,
};

export default HttpClient;
