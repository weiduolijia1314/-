import { postax } from "../common/request/index";
export function login(params={}) {
  return postax("/mod/login",params);
}
export function heart(params={}) {
  return postax('/mod/heart',params)
}
export function score(params={}) {
  return postax("/mod/score",params);
}
export function text() {
  return postax("/mod/text")
}
