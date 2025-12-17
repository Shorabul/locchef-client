import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://locchef-server.vercel.app",
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
