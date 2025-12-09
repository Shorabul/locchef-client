// import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['roleRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/role-requests');
            return res.data;
        }
    });

    // const [users, setUsers] = useState([]);

    // Sync query data with local state
    // useEffect(() => {
    //     setUsers(apiUsers);
    // }, [apiUsers]);

    const handleAccept = async (email, type) => {
        console.log(type)
        try {
            await axiosSecure.patch(`/role-requests/${email}`, {
                requestType: type,
                action: "approved"
            });

            Swal.fire({
                icon: "success",
                title: `${type} request approved`,
            });

            // Optimistic update
            // setUsers(prev =>
            //     prev.map(u => u.userEmail === email ? { ...u, requestStatus: "approved" } : u)
            // );
            refetch();

        } catch (error) {
            console.log(error);
        }
    };

    const handleReject = async (email, type) => {
        console.log(type)
        try {
            await axiosSecure.patch(`/role-requests/${email}`, {
                requestType: type,
                action: "rejected"
            });

            Swal.fire({
                icon: "error",
                title: "Request Rejected",
            });

            // setUsers(prev =>
            //     prev.map(u => u.userEmail === email ? { ...u, requestStatus: "rejected" } : u)
            // );
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="overflow-x-auto w-full text-neutral-700 dark:text-neutral-50">
            <table className="table table-zebra">
                <thead className='text-neutral-700 dark:text-neutral-50'>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, i) => (
                        <tr key={user._id}>
                            <th>{i + 1}</th>
                            <td>
                                <div>
                                    <div className="font-bold">{user.userName}</div>
                                    <div className="text-sm opacity-50">{user.userEmail}</div>
                                </div>
                            </td>
                            <td>{user.requestType}</td>
                            <td>{user.requestStatus}</td>
                            <td>{user.requestTime}</td>
                            <td className='flex items-center gap-2'>
                                <button
                                    disabled={user.requestStatus !== "pending"}
                                    onClick={() => handleAccept(user.userEmail, user.requestType)}
                                    className="py-1.5 px-3 rounded-lg font-semibold
               bg-yellow-400 text-black
               hover:bg-yellow-500
               disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
                                >
                                    Accept
                                </button>

                                <button
                                    disabled={user.requestStatus !== "pending"}
                                    onClick={() => handleReject(user.userEmail, user.requestType)}
                                    className="py-1.5 px-3 rounded-lg font-semibold
               bg-red-400 text-black
               hover:bg-red-500
               disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
                                >
                                    Reject
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRequests;