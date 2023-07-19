import { ISideChildrenContent, ISideNavContent } from '@/utils/sideNavContent'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

type Props = {
    sideNavItem: ISideNavContent
}

const SideNavContent = ({ sideNavItem }: Props) => {
    const getElementChildren = (item: ISideChildrenContent[]) => {
        return item.map(child => {
            if (child.children?.length) getElementChildren(child.children)
            return <li key={child.listTXT} className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
                {child.listTXT}{" "}
                <span>
                    <MdKeyboardArrowRight />
                </span>
            </li>
        })

    }
    return (
        <div className='py-3 border-b-[1px] border-b-gray-300'>
            <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
                {sideNavItem.headerTXT}
            </h3>
            <ul className='text-sm'>
                {sideNavItem.child.map((item: ISideChildrenContent) => (
                    <li key={item.listTXT} className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
                        {item.listTXT}{" "}
                        <span>
                            <MdKeyboardArrowRight />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SideNavContent