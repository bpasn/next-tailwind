import ProductItem from '@/components/ProductItem'
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook'
import { AppDispatch } from '@/utils/Store'
import data from '@/utils/data'
import { actionAddCart, selectCart, setCartItem } from '@/utils/slice/cartSlice'
import React from 'react'

type Props = {}

function App({ }: Props) {
    const dispatch: AppDispatch = useAppDispatch()
    const { cart } = useAppSelector(selectCart)
    const addToCartHandler = async (product: IProduct) => {
        const existItem = cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (Number(existItem?.countInStock) < quantity) {
            return alert('Sorry. Product is out of stock');
        }
        dispatch(setCartItem({ ...product, quantity }));

    };
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4">
            {data.products.map((product: IProduct) => <ProductItem product={product} key={product.name} addToCartHandler={addToCartHandler} />)}
        </div>
    )
}

export default App