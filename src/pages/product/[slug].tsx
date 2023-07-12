import data from '@/utils/data';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook';
import { selectCart } from '@/utils/slice/cartSlice';
import { AppDispatch } from '@/utils/Store';
type Props = {}

const ProductScreen = (props: Props) => {
    const { query } = useRouter();
    const { cart } = useAppSelector(selectCart)
    const dispatch: AppDispatch = useAppDispatch()
    const { slug } = query
    const product = data.products.find(x => x.slug === slug);
    if (!product) return <div>Product Not Found</div>

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (Number(existItem?.countInStock) < quantity) {
            return alert('Sorry. Product is out of stock');
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    };
    return (
        <>
            <div className="py-2">
                <Link href="/">back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image
                        src={product?.image}
                        alt={product?.name}
                        width={640}
                        height={640}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }} />
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>
                            {product.rating} of {product.numReviews} reviews
                        </li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                        <button
                            className="primary-button w-full"
                            onClick={addToCartHandler}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductScreen