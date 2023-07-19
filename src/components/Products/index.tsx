import React from 'react'
import Image from 'next/image'
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart } from 'react-icons/fa'
import FormattedPrice from '../FormattedPrice'
import { AppDispatch } from '@/utils/Store'
import { useAppDispatch } from '@/hook/useReduxHook'
import { addToCart, addToFavorite } from '@/utils/slice/nextSlice'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { UrlObject } from 'url'
import { ParsedUrlQuery } from 'querystring'
type Props = {
  product: ProductProps
}
const ProductsComponent = ({ product }: Props) => {
  const {
    _id,
    title,
    brand,
    category,
    description,
    image,
    isNew,
    oldPrice,
    price
  } = product
  const dispatch: AppDispatch = useAppDispatch();

  
  return (
    <div className='w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden'>
      <div className='w-full h-[260px] relative'>
        {/* <Link href={{
          pathname: `/client/product/${_id}`,
          query: {...product}
        }}> */}
          <Image
            className='w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300'
            width={300}
            height={300}
            src={image}
            alt='imageProduct' />
        {/* </Link> */}
        <div className='w-12 h-24 absolute bottom-10 right-0 border-[1px]
        border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300'>
          <span onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))} className='w-full h-full border-b-[1px]
        border-gray-400 bg-white  flex-col flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
            <HiShoppingCart />
          </span>
          <span onClick={() => dispatch(addToFavorite({ ...product, quantity: 1 }))} className='w-full h-full border-b-[1px]
        border-gray-400 bg-white  flex-col flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
            <FaHeart />
          </span>
        </div>
        {
          isNew && <p className='absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce'>!save <FormattedPrice amount={oldPrice - price} /></p>
        }
      </div>
      <hr />
      <div className='px-4 py-3 flex flex-col gap-1'>
        <p className='text-xs text-gray-500 tracking-wide'>{category}</p>
        <p className='text-base font-medium'>{title}</p>
        <p className='flex items-center gap-2'>
          <span className='text-sm line-through'><FormattedPrice amount={oldPrice} /></span>
          <span className='text-amazon_blue font-semibold'><FormattedPrice amount={price} /></span>
        </p>
        <p className='text-xs text-gray-600 text-justify' >{description.substring(0, 120)}</p>
        <button
          onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
          className="h-10 font-mefium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
          add to cart
        </button>
      </div>
    </div>

  )
}

export default ProductsComponent