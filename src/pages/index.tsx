import ProductItem from '@/components/ProductItem'
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook'
import ProductModel from '@/modelSchema/Product.schema'
import { AppDispatch } from '@/utils/Store'
import data from '@/utils/data'
import db from '@/utils/db'
import { getError } from '@/utils/error'
import { ShippingForm, actionAddCart, clearCartItem, selectCart, setCartItem } from '@/utils/slice/cartSlice'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify';

type Props = {
    products: ICartItem[];
}

function App({ products }: Props) {
    const dispatch: AppDispatch = useAppDispatch()
    const { cart } = useAppSelector(selectCart)
    
    const addToCartHandler = async (product: ICartItem) => {
        const existItem = cart.cartItems?.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get<IProduct>(`/api/products/${product._id}`)

        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }
        dispatch(setCartItem({ ...data, quantity }));
        toast.success("Product add to the cart successfully")

    };
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4">
            {products.map((product: ICartItem) =>
                <ProductItem product={product}
                    key={product.name}
                    addToCartHandler={addToCartHandler} />)}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    await db.connect();
    const products = await ProductModel.find().lean();
    return {
        props: {
            products: products.map(db.convertDocToObj) as ICartItem[],
        }
    }
}
export default App