import { useAppDispatch } from '@/hook/useReduxHook'
import { IInitialState, removeUser } from '@/utils/slice/nextSlice'
import { signOut } from 'next-auth/react'
import React, { useRef } from 'react'
import { LuMenu } from 'react-icons/lu'
import { connect, useSelector } from 'react-redux'
import { MdAccountCircle, MdClose } from 'react-icons/md'
import SideNavContent from './SideNavContent'
import { motion } from 'framer-motion'
import sideNavContent from '@/utils/sideNavContent'
import { AppDispatch, AppState } from '@/utils/Store'
import PropsType from 'prop-types'

type Props = {
    nextReducer: IInitialState;
    dispatch: AppDispatch
}

const BottomHeader = (props: Props) => {
    // const { userInfo } = useSelector((state: StateProps) => state.next) as IInitialState
    // const dispatch = useAppDispatch()
    const sidebarRef = useRef<HTMLDivElement>()
    const [sidebar, setSideBar] = React.useState(false);
    const handleSignout = () => {
        signOut();
        props.dispatch(removeUser())
    }
    const handleCloseSide = (event: MouseEvent) => {
        if (event.target instanceof HTMLDivElement && event.target.contains(sidebarRef.current as Node)) {
            setSideBar(!sidebar)
        }

    }
    React.useEffect(() => {
        document.body.addEventListener("click", handleCloseSide)
        return () => {
            document.body.removeEventListener("click", handleCloseSide)
        }
    }, [sidebarRef, sidebar])
    return (
        <div className='w-full h-10 bg-amazon_light text-sm text-white px-4 flex items-center'>
            <p onClick={() => {
                setSideBar(!sidebar)
            }} className='flex items-center gap-1 h-8 px-4 border border-transparent hover:border-white cursor-pointer duration-300'>
                <LuMenu className='text-xl' /> All
            </p>
            <p className='hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 '>
                Todays Deals
            </p>
            <p className='hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 '>
                Customer Service
            </p>
            <p className='hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 '>
                Registry
            </p>
            <p className='hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 '>
                Gift Cards
            </p>
            <p className='hidden md:inline-flex items-center h-8 px-2 border  border-transparent hover:border-white cursor-pointer duration-300 '>
                Sell
            </p>
            <p className='hidden md:inline-flex items-center h-8 px-2 border  border-transparent hover:border-white cursor-pointer duration-300 '>
                Sell
            </p>
            <p className='hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 '>
            </p>

            {props.nextReducer.userInfo && <button onClick={handleSignout} className='hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-red-600 hover:text-red-600 text-amazon_yellow cursor-pointer duration-300 '>
                Sign out
            </button>}

            {sidebar && (
                <div className='w-full z-50 h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50'>

                    <div className="w-full h-full relative">
                        <motion.div
                            ref={sidebarRef as React.RefObject<HTMLDivElement>}
                            initial={{ x: sidebar ? -500 : 500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: .5 }}
                            
                            className='w-[350px] h-full  bg-white border border-black'>
                            <div className='w-full text-lg bg-amazon_light h-[60px] text-white py-2 px-6 flex items-center gap-4'>
                                <MdAccountCircle />
                                <h3 className="text-lg font-title font-blod">
                                    Hello Signin
                                </h3>
                            </div>
                            {/* <SideNavContent /> */}
                            {sideNavContent.map(sideNavItem => <SideNavContent key={sideNavItem.headerTXT} sideNavItem={sideNavItem} />)}
                            {/* Button close sideNavContent */}
                            <span onClick={() => setSideBar(!sidebar)} className='cursor-pointer absolute top-0 left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300' >
                                <MdClose />
                            </span>
                        </motion.div>

                    </div>
                </div>
            )}
        </div>

    )
}

BottomHeader.prototype = {
    dispatch: PropsType.func,
    nextReducer: PropsType.object
}
const mapperRedux = (state: AppState) => ({
    nextReducer: state.next
})
const BottomHeaderConnect = connect(
    mapperRedux
)(BottomHeader)
export default BottomHeaderConnect