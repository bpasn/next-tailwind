import data from '@/utils/data';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook';
import { selectCart, setCartItem } from '@/utils/slice/cartSlice';
import { AppDispatch } from '@/utils/Store';
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';
import db from '@/utils/db';
import ProductModel from '@/modelSchema/Product.schema';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import { toast } from 'react-toastify';
type Props = {
    product: { _id?: string } & IProduct | null
}

const ProductScreen: React.FC<Props> = ({ product }) => {
    const { cart } = useAppSelector(selectCart)
    const dispatch: AppDispatch = useAppDispatch()
    if (!product) return <div>Product Not Found</div>
    console.log({
        product
    })
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get<IProduct>(`/api/products/${product._id}`)
        
        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }
        dispatch(setCartItem({ ...product, quantity }));
        toast.success("Product update to the cart successfully")

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
interface MyParsedUrlQuery extends ParsedUrlQuery {
    slug: string;
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { params } = context
    const { slug } = params as MyParsedUrlQuery
    await db.connect();
    const product = await ProductModel.findOne({ slug }).lean()
    console.log(db.convertDocToObj(product as IProduct) as IProduct)
    return {
        props: {
            product: {
                ...db.convertDocToObj(product as IProduct) as IProduct,
                _id: product?._id
            } as IProduct
        }
    }
}
export default ProductScreen