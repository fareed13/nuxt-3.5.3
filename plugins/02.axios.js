import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL = useRuntimeConfig().public.BACKEND_URL
  let api = axios.create({
    headers: {
      common: {},
    },
  });
  return {
    provide: {
      axios: api,
    },
  };
});