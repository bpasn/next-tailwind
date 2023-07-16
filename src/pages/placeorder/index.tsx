import { CheckoutWizard } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook'
import { selectCart } from '@/utils/slice/cartSlice'
import { actionPlaceOrder } from '@/utils/slice/createAction'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const PlaceOrderScreen: React.FunctionComponent<Props> & { auth: boolean } = (props: Props) => {
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector(selectCart)

    const { cartItems, paymentMethod, shippingAddress } = cart;
    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0)); //123.4567 => 123.46

    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    const router = useRouter();
    React.useEffect(() => {
        if (!paymentMethod) {
            router.push("/payment")
        }
    }, [paymentMethod, router])

    const [loading, setLoading] = React.useState(false);

    const placeOrderHandler = async () => {
        dispatch(actionPlaceOrder({
            request: {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            },
            router
        }))
    }
    return (
        <div>
            <CheckoutWizard activeStep={3} />

            <h1 className="mb-4 text-xl">
                Place Order
            </h1>
            {
                cartItems.length === 0 ? (
                    <div> Cart is empty. <Link href={'/'}>Go shopping</Link></div>
                ) : (
                    <div className="grid md:grid-cols-4 md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <div className="card p-5">
                                <h2 className="mb-2 text-g">Shipping Address</h2>
                                <div>
                                    {shippingAddress.fullName}, {shippingAddress.address},{' '}
                                    {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                                    {shippingAddress.country}
                                </div>
                                <div>
                                    <Link href="/shipping">Edit</Link>
                                </div>
                            </div>
                            <div className="cart p-5">
                                <h2 className="mb-2 text-lg">Payment Method</h2>
                                <div>{paymentMethod}</div>
                                <div>
                                    <Link href="/payment">Edit</Link>
                                </div>
                            </div>
                            <div className="card overflow-x-auto p-5">
                                <h2 className="mb-2 text-lg">Order Items</h2>
                                <div>{paymentMethod}</div>
                                <div>
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
                                            {cartItems.map((item) => (
                                                <tr key={item.slug} className="border-b">
                                                    <td>
                                                        <Link
                                                            href={`/product/${item.slug}`}
                                                            className="flex items-center gap-2"
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
                                                        {item.quantity}
                                                    </td>
                                                    <td className="p-5 text-right">${item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div>
                                        <Link href="/cart">Edit</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
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
                                <li>
                                    <button
                                        disabled={loading}
                                        onClick={placeOrderHandler}
                                        className="primary-button w-full"
                                    >
                                        {loading ? 'Loading...' : 'Place Order'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default PlaceOrderScreen

PlaceOrderScreen.auth = true;