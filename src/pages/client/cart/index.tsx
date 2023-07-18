import CartProduct from '@/components/CartProduct'
import CartPayment from '@/components/Payment'
import ResetCart from '@/components/ResetCart'
import { IInitialState } from '@/utils/slice/nextSlice'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const CartScreenClient = (props: Props) => {
    const { productData } = useSelector((state: StateProps) => state.next) as IInitialState
    return (
        //className='max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-10 py-4'
        <div className='max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-10 py-4'>
            {
                !productData.length ? (
                    <div className='bg-white h-64 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg'>
                        <h1 className='text-lg font-medium'>Your cart is empty!</h1>
                        <Link href={'/'}>
                            <button className='w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black'>go to shopping</button>
                        </Link>
                    </div>
                ) : (
                    <div className='grid mdl:grid-cols-4 mdl:gap-5'>
                        <div className='bg-white overflow-x-auto mdl:col-span-3  p-4 rounded-lg'>
                            <div className="lex items-center justify-between border-b-[1px] border-b-gray-400 pb-1" >
                                <p className="text-2xl font-semibold text-amazon_blue">
                                    Shopping Cart
                                </p>
                                <p className="text-lg font-semibold text-amazon_blue">Subtitle</p>
                            </div>
                            <div className="pt-2 flex flex-col gap-2">
                                {
                                    productData.map(item => (
                                        <div key={item._id}>
                                            <CartProduct item={item} />
                                        </div>
                                    ))
                                }
                                <ResetCart />

                            </div>
                        </div>
                        <div className="bg-white h-64 rounded-lg p-4 flex items-center md:mt-2 mdl:mt-0 justify-center">
                            <CartPayment />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CartScreenClient