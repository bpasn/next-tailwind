import Link from 'next/link'
import React, { HTMLAttributes, ReactElement } from 'react'

type Props = {
    href: string;
    children: React.ReactNode | string | string[];
} & React.HTMLAttributes<HTMLElement>

const DropdownLink: React.FC<Props> = (props) => {
    const { href, children, ...rest } = props;
    return (
        <Link {...rest} href={href} >{children}</Link>
    )
}

export default DropdownLink