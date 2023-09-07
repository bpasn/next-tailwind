import { useAppDispatch } from '@/hook/useReduxHook';
import { useRouter } from 'next/router';
import { BeatLoader } from "react-spinners";
import { HiShoppingCart } from 'react-icons/hi'
import React from 'react'
import { addToCart, addToFavorite } from '@/utils/slice/nextSlice';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import FormattedPrice from '@/components/FormattedPrice';
import Head from 'next/head';
type Props = {}
type MyParsedUrl = {

} & ParsedUrlQuery & StoreProduct
const DynamicPage = (props: Props) => {
  const [product, setProduct] = React.useState<StoreProduct>({} as StoreProduct);
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter();
  const {
    _id,
    brand,
    category,
    description,
    image,
    isNew,
    oldPrice,
    price,
    title,
  } = router.query as MyParsedUrl
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2 * 1000)
    setProduct({
      _id,
      brand,
      category,
      description,
      image,
      isNew,
      oldPrice,
      price,
      title,
      quantity: 1
    })
  }, [])
  return (
    <>
      <Head>
        <title>Shopping Product</title>
      </Head>
      <div className='max-w-screen-xl mx-auto px-4 py-4 md:py-10'>
        {isLoading ? (
          <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
            <p>Your product is Loading...</p>
            <BeatLoader color='#131921' size={40} />
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">

              <Image
                src={product?.image as string}
                alt='product image'
                width={500}
                height={500}
              />

              <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
                <span
                  onClick={() => dispatch(addToCart(product as StoreProduct))}
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300">
                  <HiShoppingCart />
                </span>
                <span
                  onClick={() =>
                    dispatch(
                      addToFavorite(product as StoreProduct)
                    )
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                >
                  <FaHeart />
                </span>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
              <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
                {product?.category}_{product?.brand}
              </p>
              <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
                {product?.title}
              </h1>
              <p className="text-sm text-gray-600">{product?.description}</p>
              <div>
                <p className="text-base text-gray-600 flex items-center gap-1">
                  Price:
                  <span className="text-lg text-amazon_blue font-ssemibold">
                    <FormattedPrice amount={product?.price!} />
                  </span>
                  <span className="ml-1 line-through">
                    <FormattedPrice amount={product?.oldPrice!} />
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  Your saved:{" "}
                  <span>
                    <FormattedPrice amount={product?.oldPrice! - product?.price!} />
                  </span>
                </p>
                <button
                  onClick={() => dispatch(addToCart(product!))}
                  className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold">
                  add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DynamicPage