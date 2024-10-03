import { useState } from 'react';

import { NavLink } from '@mantine/core';
import { Link } from 'react-router-dom'

interface INavItem {
    href: string;
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
        href: '/verbs',
        label: 'Verbs',
        children: [
            {
                href: '/verbs/present-tense',
                label: 'Present Tense',
                children: []
            },
            {
                href: '/verbs/past-tense',
                label: 'Past Tense',
                children: []
            }
        ]
    }
]


interface Props {
    onNavLinkClick?: () => void;
}
export const Navbar = (props: Props) => {

    const [active, setActive] = useState<string>("");
    const onNavLinkClick = (label: string) => {
        setActive(label)
        if (props.onNavLinkClick) {
            props.onNavLinkClick();
        }
    }

    const createNavLink = (navItem: INavItem) => {
        if (navItem.href && navItem.children.length === 0) {
            return (
                <NavLink
                    component={Link}
                    to={navItem.href}
                    key={navItem.label}
                    active={navItem.label === active}
                    label={navItem.label}
                    onClick={() => onNavLinkClick(navItem.label)}
                />
            )
        } else {
            return (
                <NavLink
                    component={Link}
                    to={navItem.href}
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