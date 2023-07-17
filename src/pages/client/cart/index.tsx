import CartProduct from '@/components/CartProduct'
import { IInitialState } from '@/utils/slice/nextSlice'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const CartScreenClient = (props: Props) => {
    const { productData } = useSelector((state: StateProps) => state.next) as IInitialState
    return (
        <div className='max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-10 py-4 '>
            {
                !productData.length ? (
                    <div>
                        <h1>Your cart is empty!</h1>
                        <button>go to shopping</button>
                    </div>
                ) : (

                    <div>
                        <div className='bg-white col-span-4 p-4 rounded-lg'>
                            <div className="flex items-center justify-between border-b-[1px] border-b-bray-400 pb-1" >
                                <p className='text-2xl font-semibold text-amazon_blue'>Shopping Cart</p>
                                <p className="text-lg font-semiblod text-amazon_blue">Subtitle</p>
                            </div>
                            <div>
                                {
                                    productData.map(item => (
                                        <div key={item._id} className='pt-2 flex flex-col gap-2'>
                                            <CartProduct  />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CartScreenClient