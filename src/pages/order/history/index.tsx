import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook'
import { getError } from '@/utils/error';
import { IOrderInit, actionFetchOrder, selectOrder } from '@/utils/slice/orderSlice'
import axios from 'axios';
import Link from 'next/link';
import React, { useReducer } from 'react'

type Props = {}
const stateInnit: {
    loading: boolean;
    orders: {} & IOrderInit[];
    error?: string;
} = {
    loading: true,
    orders: [],
    error: ''
}
function reducer(state = stateInnit, action: any) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const OrderHistoryScreen = (props: Props) => {
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, stateInnit);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/history`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchOrders();
    }, []);
    return (
        <div>
            <h1 className="mb-4 text-xl">Order History</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="alert-error">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="px-5 text-left">ID</th>
                                <th className="p-5 text-left">DATE</th>
                                <th className="p-5 text-left">TOTAL</th>
                                <th className="p-5 text-left">PAID</th>
                                <th className="p-5 text-left">DELIVERED</th>
                                <th className="p-5 text-left">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: IOrderInit) => (

                                <tr key={order._id} className="border-b">
                                    <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                                    <td className=" p-5 ">{order.createdAt.toString().substring(0, 10)}</td>
                                    <td className=" p-5 ">${order.totalPrice}</td>
                                    <td className=" p-5 ">
                                        {order.isPaid
                                            ? `${order.paidAt.toString().substring(0, 10)}`
                                            : 'not paid'}
                                    </td>
                                    <td className=" p-5 ">
                                        {order.isDelivered
                                            ? `${order.deliveredAt.toString().substring(0, 10)}`
                                            : 'not delivered'}
                                    </td>
                                    <td className=" p-5 ">
                                        <Link href={`/order/${order._id}`} passHref>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default OrderHistoryScreen