import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook';
import {  removeCartItem, selectCart, setCartItem } from '@/utils/slice/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import React from 'react'
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline'
import axios from 'axios';
import { toast } from 'react-toastify';
type Props = {}

const CartScreen = (props: Props) => {
    const router = useRouter();
    const {redirect} = router.query
    const { cart: { cartItems } } = useSelector(selectCart)
    const dispatch = useAppDispatch()
    const removeItemHandler = (item: ICartItem) => {
        dispatch(removeCartItem(item))
        toast.success("Remove product form cart successfully")

    }
    const updateCartHandler = async (item: { _id?: string } & ICartItem, qty: string) => {
        const quantity = Number(qty);
        const { data } = await axios.get<IProduct>(`/api/products/${item._id}`)
        if (data.countInStock < quantity ) {
            return toast.error("Sorry. Product is out of stock");
        }
        dispatch(setCartItem({ ...item, quantity }))
        toast.success("Product update to the cart successfully")
    }
    return (
        <>
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {!cartItems?.length ? (
                <div>
                    Cart is empty. <Link href="/">Go shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full ">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems?.map((item) => (
                                    <tr key={item.slug} className="border-b">
                                        <td>
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className="flex items-center"
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                    style={{
                                                        maxWidth: '100%',
                                                        height: 'auto',
                                                    }}
                                                ></Image>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">
                                            <select
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateCartHandler(item, e.target.value)
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-5 text-right">${item.price}</td>
                                        <td className="p-5 text-center">
                                            <button onClick={() => removeItemHandler(item)}>
                                                <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 text-xl">
                                    Subtotal ({cartItems?.reduce((a:number, c:ICartItem) => a + c.quantity, 0)}) : $
                                    {cartItems?.reduce((a:number, c:ICartItem) => a + c.quantity * c.price, 0)}
                                </div>
                            </li>
                            <li>
                                <button
                                    onClick={() => router.push(`login?redirect=${redirect ? redirect.toString() : '/shipping'}`)}
                                    className="primary-button w-full"
                                >
                                    Check Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartScreen