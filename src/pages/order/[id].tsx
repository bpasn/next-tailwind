import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook'
import { AppDispatch } from '@/utils/Store'
import { actionFetchOrderById, selectOrder } from '@/utils/slice/orderSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
type Props = {}

const OrderScreen: React.FC<Props> & { auth?: boolean } = (props: Props) => {
    const { query } = useRouter()
    const orderId = query.id;
    const dispatch: AppDispatch = useAppDispatch();
    const { order, loading, error } = useAppSelector(selectOrder)
    React.useEffect(() => {
        const fetchOrder = async () => {
            dispatch(actionFetchOrderById(orderId as string))
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder()
        }
    }, [order, orderId])

    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt
    } = order
    console.log(orderItems)
    return (
        <div>
            <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
            {loading ? (<div>Loading...</div>) :
                error ? (
                    <div className='alert-error'>{error}</div>
                ) : (
                    <div className="grid mb:grid-cols-4 mb:gap-5">
                        <div className="overflow-x-auto mb:col-span-3">
                            <div className="card p-5">
                                <h2 className="mb-2 text-lg">Shipping Address</h2>
                                <div>
                                    {shippingAddress?.fullName}, {shippingAddress?.address},{' '}
                                    {shippingAddress?.city}, {shippingAddress?.postalCode},{' '}
                                    {shippingAddress?.country}
                                </div>
                                {isDelivered ? (
                                    <div className="alert-success">Delivered as {deliveredAt.toString()}</div>
                                ) : (
                                    <div className="alert-error">Not delivered</div>
                                )}
                            </div>

                            <div className="cart p-5">
                                <h2 className="mb-2 text-lg">Payment Method</h2>
                                <div>{paymentMethod}</div>
                                {isPaid ? (
                                    <div className="alert-success">Paid at {paidAt.toString()}</div>
                                ) : (
                                    <div className="alert-error">Not paid</div>
                                )}
                            </div>

                            <div className="card orverflow-x-auto p-5">
                                <h2 className="mb-2 text-lg">Order Items</h2>
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-5 text-left">Item</th>
                                            <th className="px-5 text-left">Quantity</th>
                                            <th className="px-5 text-left">Price</th>
                                            <th className="px-5 text-left">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
            
                                        {!_.isEmpty(orderItems) && orderItems.map(item => (
                                            <tr key={item.name} className="border-b">
                                                <td>
                                                    <Link href={`/product/${item.slug}`} className="flex items-center">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        />
                                                        &nbsp;
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="p-5 text-right">{item.quantity}</td>
                                                <td className="p-5 text-right">{item.price}</td>
                                                <td className="p-5 text-right">
                                                    ${item.quantity * item.price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div className="card p-5">
                                <h2 className="mb-2 text-lg">Order Summary</h2>
                                <ul>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Items</div>
                                            <div>${itemsPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Tax</div>
                                            <div>${taxPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Shipping</div>
                                            <div>${shippingPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Total</div>
                                            <div>${totalPrice}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default OrderScreen

OrderScreen.auth = true;