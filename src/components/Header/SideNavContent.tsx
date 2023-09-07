import { ISideChildrenContent, ISideNavContent } from '@/utils/sideNavContent'
import React, { memo } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import SideNavMenu from './SideNavMenu'
import { motion as Motion } from 'framer-motion'

import data from '@/utils/data'
type Props = {
    sideNavItem: ISideNavContent
}

const SideNavContent = ({ sideNavItem }: Props) => {
    const sideBarRef = React.useRef<HTMLDivElement>()
    const [sideActive, setSideActive] = React.useState(false);
    const [subMenu, setSubMenu] = React.useState<ISideChildrenContent[]>();
    const getElementChildren = (item: ISideChildrenContent[]) => {
        return item.map(child => {
            if (child.title) {
                return <div key={child.listTXT}>
                    <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
                        {child.listTXT}
                    </h3>
                    {getElementChildren(child.children!)}
                </div>
            }
            return (
                <ul className="text-sm" key={child.listTXT}>
                    <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2  cursor-pointer">
                        {child.listTXT}
                        <span>
                            <MdKeyboardArrowRight />
                        </span>
                    </li>
                </ul>
            )
        })
    }
    let px = 6;
    let py = 2;
    const generageMenu = (menus: MenuItem[]) => menus.map((menu: MenuItem, index) => {
        if (menu.title) {
            return (
                <div key={index} className='py-3 border-b-[1px] border-b-gray-300'>
                    <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
                        {menu.name}
                    </h3>
                    {generageMenu(menu.child!)}
                </div>
            )
        }
        if (menu.child || menu.linkParent) {
            px = px + 2;
            py = py + 2;
            return <div key={index}>
                <ul className="text-sm">
                    <li className={`${!menu.child && 'flex items-center justify-between hover:bg-zinc-200 cursor-pointer'} px-6 py-2 `}>
                        <div className={`flex items-center justify-between hover:bg-zinc-200 cursor-pointer px-6 py-2 `}>
                            {menu.name}
                            <span>
                                <MdKeyboardArrowRight />
                            </span>
                        </div>
                        {menu.child && (
                            generageMenu(menu.child)
                        )}
                    </li>
                </ul>
            </div>
        }
        return (
            <ul className="text-sm" key={index}>
                <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2  cursor-pointer">
                    {menu.name}
                    <span>
                        <MdKeyboardArrowRight />
                    </span>
                </li>
            </ul>
        )
    })
    return (
        // <div>
        //     {generageMenu(data.menus)}
        // </div>
        <div className='py-3 border-b-[1px] border-b-gray-300'>
            <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
                {sideNavItem.headerTXT}
            </h3>
            <ul className='text-sm'>
                {sideNavItem.child.map((item: ISideChildrenContent) => (
                    <li key={item.listTXT} onClick={() => {
                        setSideActive(true)
                        setSubMenu(item.children)
                    }} className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
                        {item.listTXT}{" "}
                        <span>
                            <MdKeyboardArrowRight />
                        </span>
                    </li>
                ))}
            </ul>
            {sideActive && <div className='w-full z-50 h-screen text-black fixed top-[3.8rem] left-0 bg-amazon_blue bg-opacity-50'>
                <div className="w-full h-full relative">
                    <Motion.div
                        ref={sideBarRef as React.RefObject<HTMLDivElement>}
                        initial={{ x: -500, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ x: 500, duration: .5 }}
                        className='w-[350px] h-full  bg-white border border-black'>
                        <div className='flex items-center gap-2 hover:bg-zinc-200 px-6 py-2 cursor-pointer' onClick={() => {
                            setSideActive(false)
                            setSubMenu([])
                        }}>
                            <span className='text-lg font-titleFont font-semibold ' >
                                <AiOutlineArrowLeft />
                            </span>
                            <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
                                Main Menu
                            </h3>
                        </div>
                        {/* <SideNavContent /> */}
                        {subMenu?.length && getElementChildren(subMenu)}
                        {/* {sideNavContent.map(sideNavItem => <SideNavContent key={sideNavItem.headerTXT} sideNavItem={sideNavItem} />)} */}

                    </Motion.div>

                </div>
            </div>}
        </div>
    )
}

export default SideNavContent