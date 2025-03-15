import { AxiosInstance } from "axios";

export function addAppKeyRequestInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    async (config:any) => {
      const appKey = localStorage.getItem("appKey");
      if (appKey)
        config.headers = { ...(config.headers ?? {}), appKey };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}
