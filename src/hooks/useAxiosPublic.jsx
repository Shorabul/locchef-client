import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: "https://locchef-server.vercel.app",
    baseURL: "http://localhost:3000",
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
