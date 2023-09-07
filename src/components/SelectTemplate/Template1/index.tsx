import ProductItem from '@/components/ProductItem'
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook'
import ProductModel from '@/modelSchema/Product.schema'
import { AppDispatch, AppState } from '@/utils/Store'
import db from '@/utils/db'
import { getError } from '@/utils/error'
import { selectCart, setCartItem } from '@/utils/slice/cartSlice'
import { Tab } from '@headlessui/react'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { Fragment } from 'react'
import { toast } from 'react-toastify';

// type Props = {
// products: ICartItem[];
// }
const categories: string[] = ['Shirts', 'Pants']
function classesName(...arg: string[]) {
    return arg.filter(Boolean).join(" ")
}
function TemplateOne() {
    const dispatch: AppDispatch = useAppDispatch()
    const { cart } = useAppSelector(selectCart)

    const addToCartHandler = async (product: ICartItem) => {
        const existItem = cart.cartItems?.find((x: ICartItem) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get<IProduct>(`/api/products/${product._id}`)

        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }
        dispatch(setCartItem({ ...data, quantity }));
        toast.success("Product add to the cart successfully")

    };
    const [category, setCategory] = React.useState<string>(categories[0])
    const [products, setProducts] = React.useState<ICartItem[]>([])
    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await axios.get<ICartItem[]>("/api/products")
                setProducts(result.data)
            } catch (error) {
                toast.error(getError(error))
            }
        }
        fetchProduct()
    }, [category])

    return (
        <div className={classesName(
            'rounded-xl bg-white p-3',
            'grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4',
            `ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`
        )}>
        {/* <Tab.Group>
                <Tab.List className={`flex space-x-1 rounded-xl bg-blue-900/20 p-2`}>
                    {categories.map(category => {
                        return (
                            <Tab
                                onChange={() => setCategory(category)}
                                key={category}
                                className={({ selected }) => classesName(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ',
                                    selected
                                        ? 'primary-button shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'

                                )}
                            >
                                {category}
                            </Tab>
                        )
                    })}

                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel className={classesName(
                        'rounded-xl bg-white p-3',
                        'grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4',
                        `ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`
                    )}>
                        {products.map((product: ICartItem) =>
                            <ProductItem product={product}
                                key={product.name}
                                addToCartHandler={addToCartHandler} />)}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group> */}
            {products.map((product: ICartItem) =>
                <ProductItem product={product}
                    key={product.name}
                    addToCartHandler={addToCartHandler} />)}
        </div>

    )
}

// export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
//     await db.connect();
//     const products = await ProductModel.find({}).lean();
//     console.log({products})
//     return {
//         props: {
//             products: products.map(db.convertDocToObj) as ICartItem[],
//         }
//     }
// }
export default TemplateOne