import Link from 'next/link'
import React, { ReactElement } from 'react'

type Props = {
    href: string;
    children: React.ReactNode | string | string[];
} & React.HTMLAttributes<HTMLElement>

const DropdownLink: React.FC<Props> = (props) => {
    const { href, children, ...rest } = props;
    return (
        <Link href={href} {...rest} >{children}</Link>
    )
}

export default DropdownLink