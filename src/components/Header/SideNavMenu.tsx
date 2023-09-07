import data from '@/utils/data'
import { Disclosure } from '@headlessui/react'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

type Props = {}

const SideNavMenu = (props: Props) => {
    const getMenu = (menus: MenuItem[]) => menus.map((item: MenuItem, index: number) => {

        if (item.child || item.linkParent) {
            return (
                <div key={index}>
                    <Disclosure as={"div"}>
                        <Disclosure.Button as='h3' className="text-lg font-titleFont font-semiblod mb-1 px-6 cursor-pointer">
                            {item.name}
                        </Disclosure.Button>
                        {!item.linkParent && (
                            <div>
                                <Disclosure.Panel as={"ul"} className="text-sm">
                                <Disclosure.Button as='li' className="px-6 py-2 cursor-pointer">
                                    {getMenu(item.child!)}
                                    <span>
                                        <MdKeyboardArrowRight />
                                    </span>
                                </Disclosure.Button>
                            </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                </div>
            )
        }
        if (item.title) {
            return (
                <Disclosure as={"ul"} className={"text-sm"}>
                    <Disclosure.Button as='li' className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
                        {item.name}
                    </Disclosure.Button>
                </Disclosure>

            )
        }
        return (
            <div key={index} >
                <Disclosure as={"ul"} className={"text-sm"}>
                    <Disclosure.Button as={"li"} className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
                        {item.name}
                    </Disclosure.Button>
                </Disclosure>
            </div>
        )
    })
    return (
        <div>
            {getMenu(data.menus)}
        </div>
    )
}

export default SideNavMenu