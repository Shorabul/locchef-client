import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Container from '../../../components/Shared/Container';
import EmptyState from '../../../components/EmptyState';
import Skeleton from '../../../components/Skeleton';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch user's orders
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/user/${user.email}`);
            return res.data;
        }
    });

    console.log(orders);

    // Handle Stripe payment
    const handlePay = async (order) => {
        const totalPrice = order.price * order.quantity;

        const result = await Swal.fire({
            title: `Your total price is $${totalPrice}`,
            text: "Do you want to confirm the payment?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            const orderInfo = {
                totalPrice,
                mealName: order.mealName,
                customerEmail: user.email,
                orderId: order._id,
            };

            const res = await axiosSecure.post('/orders/payment-checkout-session', orderInfo);

            // redirect to Stripe
            window.location.assign(res.data.url);
        }
    };
    if (isLoading) {
        return (
            <Container>
                <div className="overflow-x-auto w-full mt-6">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-[#ffde59] text-black">
                                <th>#</th>
                                <th>Meal Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Chef Name</th>
                                <th>Chef ID</th>
                                <th>Order Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[1, 2, 3, 4].map((i) => (
                                <tr key={i}>
                                    <td><Skeleton className="h-4 w-6" /></td>
                                    <td><Skeleton className="h-4 w-32" /></td>
                                    <td><Skeleton className="h-4 w-16" /></td>
                                    <td><Skeleton className="h-4 w-10" /></td>
                                    <td><Skeleton className="h-4 w-20" /></td>
                                    <td><Skeleton className="h-4 w-20" /></td>
                                    <td><Skeleton className="h-4 w-28" /></td>
                                    <td><Skeleton className="h-4 w-20" /></td>
                                    <td><Skeleton className="h-4 w-24" /></td>
                                    <td><Skeleton className="h-8 w-20" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        );
    }

    if (!orders.data || orders.data.length === 0) {
        return (
            <Container>
                <EmptyState message="You have no orders yet." />
            </Container>
        );
    }


    return (
        <Container>
            <div className="overflow-x-auto w-full mt-6 bg-neutral-50 dark:bg-neutral-600">
                <table className="table w-full">
                    <thead>
                        <tr className='bg-[#ffde59] text-black'>
                            <th>#</th>
                            <th>Meal Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Order Status</th>
                            <th>Payment Status</th>
                            <th>Chef Name</th>
                            <th>Chef ID</th>
                            <th>Order Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data?.map((order, i) => (
                            <tr key={order?._id}
                                className='text-gray-500 dark:text-gray-300'
                            >
                                <th>{i + 1}</th>
                                <td>{order?.mealName}</td>
                                <td>${order?.price}</td>
                                <td>{order?.quantity}</td>
                                <td>{order?.orderStatus}</td>
                                <td>{order?.paymentStatus}</td>
                                <td>{order?.chefName || 'Unknown'}</td>
                                <td>{order?.chefId}</td>
                                <td>{new Date(order?.orderTime).toLocaleString()}</td>
                                <td>
                                    {
                                        order.paymentStatus !== 'paid' && <button
                                            onClick={() => handlePay(order)}
                                            disabled={!(order.orderStatus === 'accepted' && order.paymentStatus === 'Pending')}
                                            className={`py-1 px-3 rounded font-semibold ${order.orderStatus === 'accepted' && order.paymentStatus === 'Pending'
                                                ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                }`}
                                        >
                                            Pay
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default MyOrders;
