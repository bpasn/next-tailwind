import Image from "next/image"
import logo from '@/images/logo.png'
type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="w-full h-20 bg-amazon_light text-gray-400 flex items-center justify-center gap-4">
        <Image src={logo} alt="logo" className="w-24"/>
        <p className="text-sm -mt-4">All reghts reserved 
        <a className="hover:text-white hover:underline decoration-[1px] cursor-pointer duration-300" href="">@reactbd.com</a></p>
    </div>
  )
}

export default Footer