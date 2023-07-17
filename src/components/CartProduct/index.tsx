import Image from "next/image"
type Props = {}

const CartProduct = (props: Props) => {
    return (
        <div className='bg-gray-100 rounded-lg flex items-center gap-4'>
            <Image src={'item.image'} width={150} height={150} alt="productImage" className="object-cover" />
        <div>
            
        </div>
        </div>
    )
}

export default CartProduct