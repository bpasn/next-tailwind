import Image from "next/image"
import FormattedPrice from "../FormattedPrice"
import { LuMinus, LuPlus } from 'react-icons/lu'
import { IoMdClose } from 'react-icons/io'
import { useAppDispatch } from "@/hook/useReduxHook"
import { decreaseQuantity, deleteProduct, increaseQuantity } from "@/utils/slice/nextSlice"
type Props = {
    item: StoreProduct
}

const CartProduct = ({ item }: Props) => {
    const dispatch = useAppDispatch();
    
    return (
        <div className='bg-gray-100 rounded-lg md:flex items-center gap-4 grid grid-cols-1 mdl:grid-cols-3  '>
            <Image
                src={item.image}
                width={150}
                height={150}
                alt="productImage"
                className="object-cover"
            />
            <div className="grid md:flex grid-cols-1 md:gap-5  items-center px-2 gap-4">
                <div className="grid-cols-4 md:flex flex-col gap-1">
                    <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-600">
                        Unit Price{" "}
                        <span  className="font-semibold text-amazon_blue">
                            <FormattedPrice amount={item.price} />
                        </span>
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center  mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
                            <span onClick={() => dispatch(increaseQuantity(item._id))} className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"><LuPlus /></span>
                            <span>{item.quantity}</span>
                            <span onClick={() => dispatch(decreaseQuantity(item._id))} className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"><LuMinus /></span>
                        </div>
                        <div onClick={() => dispatch(deleteProduct(item._id))} className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300">
                            <IoMdClose className="mt-[2px]" /> <p>remove</p>
                        </div>
                    </div>
                </div>
                <div className="text-lg font-semibold text-amazon_blue">
                    <FormattedPrice amount={item.price * item.quantity} />
                </div>
            </div>
        </div>
    )
}

export default CartProduct