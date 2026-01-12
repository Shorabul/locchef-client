import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAuthRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [backendData, setBackendData] = useState(null);
    const [backendLoading, setBackendLoading] = useState(true);

    useEffect(() => {
        if (!user?.email || !user?.accessToken) {
            setBackendData(null);
            setBackendLoading(false);
            return;
        }

        let cancelled = false;

        const loadRole = async () => {
            try {
                setBackendLoading(true);
                const res = await axiosSecure.get(`/users/${user.email}`);
                if (!cancelled) setBackendData(res.data);
            } catch (err) {
                console.error("Role fetch failed", err);
                if (!cancelled) setBackendData(null);
            } finally {
                if (!cancelled) setBackendLoading(false);
            }
        };

        loadRole();

        return () => {
            cancelled = true;
        };
    }, [user, axiosSecure]);

    return { backendData, backendLoading };
};

export default useAuthRole;

// import { useEffect, useState } from "react";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";


// const useAuthRole = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const [backendData, setBackendData] = useState(null);
//     const [backendLoading, setBackendLoading] = useState(true);
//     console.log(backendData);
//     useEffect(() => {
//         if (!user?.email) {
//             setBackendData(null);
//             setBackendLoading(false);
//             return;
//         }

//         let cancelled = false;

//         const loadRole = async () => {
//             try {
//                 setBackendLoading(true);
//                 const res = await axiosSecure.get(`/users/${user.email}`);
//                 if (!cancelled) setBackendData(res.data);
//             } catch (err) {
//                 console.error("Role fetch failed", err);
//                 if (!cancelled) setBackendData(null);
//             } finally {
//                 if (!cancelled) setBackendLoading(false);
//             }
//         };

//         loadRole();
//         return () => (cancelled = true);
//     }, [user, axiosSecure]);

//     return { backendData, backendLoading };
// };

// export default useAuthRole;
