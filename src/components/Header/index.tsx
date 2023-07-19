import logo from '../../images/logo.png'
import Image from 'next/image'
import cartIcon from '../../images/cartIcon.png'
import { BiCaretDown } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'
import { SlLocationPin } from 'react-icons/sl'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { IInitialState, addUser } from '@/utils/slice/nextSlice'
import { signIn, useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/hook/useReduxHook'
import React from 'react'
import { userInfo } from 'os'
type Props = {}

const Header = (props: Props) => {
    const { productData, favoriteData, userInfo } = useSelector((state: StateProps) => state.next) as IInitialState
    const dispatch = useAppDispatch()
    const { data: session } = useSession()
    React.useEffect(() => {
        if (session) {
            dispatch(addUser({
                name: session.user?.name,
                email: session.user?.email,
                image: session.user?.image
            }))
        }
    }, [session])
    return (
        <header className='w-full h-20 bg-amazon_blue text-white sticky top-0 z-50'>
            <div className='h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4'>
                {/* Login */}
                <Link href={'/'}>
                    <div className="px-2 border border-transparent hover:border-white 
            cursor-pointer duration-300 flex items-center justify-center h-[70%]">
                        <Image src={logo} alt='logoImg' className='w-28 object-cover mt-1' />
                    </div>
                </Link>
                {/* delivery */}
                <div className='px-2 border border-transparent hover:border-white 
            cursor-pointer duration-300 items-center justify-center h-[70%]
            hidden xl:inline-flex gap-1'>
                    <SlLocationPin />
                    <div className='text-xs'>
                        <p>Deiver to</p>
                        <p className='text-white font-bold uppercase'>USA</p></div>
                </div>
                {/* seachbar */}
                <div className='flex-1 h-10 hidden md:inline-flex items-center justify-between relative'>
                    <input
                        className='w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none
                    focus-visible:border-amazon_yellow'
                        type="text" placeholder='Search next_amazon_yt products' />
                    <span className='w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center
                    absolute right-0 rounded-tr-md rounded-br-md
                    '>
                        <HiOutlineSearch />
                    </span>
                </div>
                {/* signin */}
                {userInfo ? (
                    <div
                        className='flex items-center px-2 border border-transparent hover:border-white 
                        cursor-pointer duration-300 h-[70%] gap-1'>
                        <img src={userInfo?.image?.toString() ?? ""} alt="userImage" className='w-8 h-8 rounded-full object-cover' />
                        <div className='text-xs text-gray-100 flex flex-col justify-between'>
                            <p className='text-white font-bold'>{userInfo.name}</p>
                            <p>{userInfo.email}</p>
                        </div>
                    </div>) : (
                    <div onClick={() => signIn("",{
                        redirect:false
                    }).then(e => {

                    })} className='text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]'>
                        <p>Hello, sign in</p>
                        <p className='text-white font-bold flex items-center'>Account & Lists
                            <span>
                                <BiCaretDown />
                            </span>
                        </p>
                    </div>
                )}
                {/* favorite */}
                <div className='text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
                    <p>Marked</p>
                    <p className='text-white font-bold'>& Favorite</p>
                    {favoriteData.length > 0 && (
                        <span className='absolute right-2 top-2 w-4 h-4 border-[1px] order-gray-400 flex items-center justify-center text-xs text-amazon_yellow'>{favoriteData.length}</span>
                    )
                    }
                </div>
                {/* cart */}
                <Link href={'/client/cart'}
                    className='flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
                    <Image className='w-auto object-cover h-8' src={cartIcon} alt='cartImg' />
                    <p className='text-xs text-white font-bold mt-3'>Cart</p>
                    <span className='absolute text-amazon_yellow text-xs top-2 left-[29px] font-semibold'>
                        {productData.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                </Link>
            </div>
        </header>
    )
}

export default Header