import { useState } from 'react';

import { NavLink } from '@mantine/core';

interface INavItem {
    href?: string;
    label: string;
    children: INavItem[]
}
const navItems: INavItem[] = [
    {
        href: '/',
        label: 'Home',
        children: []
    },
    {
        label: 'Verbs',
        children: [
            {
                href: '/present-tense',
                label: 'Present Tense',
                children: []
            },
            {
                href: '/past-tense',
                label: 'Past Tense',
                children: []
            }
        ]
    }
]



export const Navbar = () => {

    const [active, setActive] = useState<string>("");

    const createNavLink = (navItem: INavItem) => {
        if (navItem.href && navItem.children.length === 0) {
            return (
                <NavLink
                    href={navItem.href}
                    key={navItem.label}
                    active={navItem.label === active}
                    label={navItem.label}
                    onClick={() => setActive(navItem.label)}
                />
            )
        } else {
            return (
                <NavLink
                    href={navItem.href}
                    key={navItem.label}
                    active={navItem.label === active}
                    label={navItem.label}
                    onClick={() => setActive(navItem.label)}>

                    {navItem.children.map((navItemChild) => (createNavLink(navItemChild)))}
                </NavLink>
            )
        }
    }

    const items = navItems.map(navItem => (createNavLink(navItem)))
    return (
        <>
            {items}
        </>
    )
}