import axios from "axios";
import { baseURL, timeout } from "./config";
import store from "../../plug-in/store";
// const instance = axios.create({
//   baseURL,
//   // timeout,
// });
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = timeout;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头（推荐
axios.interceptors.response.use(
  (response) => {
    // console.log("这是响应拦截器")
    // console.log(response)
    return response.data;
  },
  (error) => {
    console.log(error);
  }
);
axios.interceptors.request.use((request) => {
    // request.headers["token"] = store.state.userinfo.token;
  // console.log("这是请求拦截器")
  request.headers['token'] = store.state.userinfo.token
  // console.log(request)
  request.headers["Content-Type"] = 'application/json'
  // request.headers['Authorization'] = 'token'+store.state.userinfo.token;
  return request;
});
export function getax(url, ...args) {
  return axios(url, ...args);
}
export function postax(url,data = {}, ...args) {
  return axios({
    url,
    method: "post",
    data,
    ...args,
  });
}
