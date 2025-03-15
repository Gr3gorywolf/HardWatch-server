import axios from 'axios';

export const getApi = () => {
  const appKey = localStorage.getItem("appKey");
  return axios.create({
    baseURL: import.meta.env.DEV
      ?  import.meta.env.VITE_SERVER_URL ??"http://localhost:3400"
      :  window.location.origin,
    headers: {
      appKey
    }
  });
};
