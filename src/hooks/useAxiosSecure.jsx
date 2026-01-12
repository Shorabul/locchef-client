import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
    // baseURL: 'https://locchef-server.vercel.app',
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const reqInterceptor = axiosSecure.interceptors.request.use(
    //         (config) => {
    //             if (user?.accessToken) {
    //                 config.headers.Authorization = `Bearer ${user.accessToken}`;
    //             }
    //             return config;
    //         },
    //         (error) => Promise.reject(error)
    //     );

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {

            console.log(error);

            // const statusCode = error.status;
            const statusCode = error.response?.status;

            if (statusCode === 401 || statusCode === 403) {
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
            }

            return Promise.reject(error);
        })
        // const resInterceptor = axiosSecure.interceptors.response.use(
        //     (response) => response,
        //     async (error) => {
        //         const status = error?.response?.status;

        //         if (status === 401 || status === 403) {
        //             await logOut();
        //             navigate("/login");
        //         }

        //         return Promise.reject(error);
        //     }
        // );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;

// import axios from 'axios';
// import React from 'react';
// const axiosSecure = axios.create({
//     // baseURL: 'https://locchef-server.vercel.app',
//     baseURL: 'http://localhost:3000',
//     withCredentials: true
// })
// const useAxiosSecure = () => {
//     return axiosSecure;
// };

// export default useAxiosSecure;