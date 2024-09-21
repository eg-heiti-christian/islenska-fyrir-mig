"use client"

import React, { useState, useCallback } from "react"

import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

type Menu = {
    label: string
    submenu: Submenu[]
    href: string
}

type Submenu = {
    label: string
    href: string
}

const menus: Menu[] = [
    {
        label: "Home",
        href: "/",
        submenu: []
    },
    {
        label: "Verbs",
        href: "/verbs",
        submenu: [
            {
                label: "Present Tense",
                href: "/verbs/present-tense",
            },
            {
                label: "Past Tense",
                href: "/verbs/past-tense",
            },
        ]
    }
];

interface SubMenuNavLinkProps {
    menuItem: Menu;
}
function SubMenuNavLink(props: SubMenuNavLinkProps) {

    const [expanded, setExpanded] = useState<boolean>(false);

    const getMenuContent = (submenus: Submenu[]) => {
        return submenus.map((submenuItem) => {
            return (
                <li key={submenuItem.label} className="col-span-1">
                    <NavigationMenuItem>
                        <NavigationMenuLink href={submenuItem.href}>
                            <Button className="w-full" variant="ghost">
                                {submenuItem.label}
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </li>
            )
        })
    }

    return (
        <>
            <Button className="w-full group" data-expanded={expanded} variant="ghost" onClick={() => setExpanded(!expanded)}>
                {props.menuItem.label}
                <ChevronDown
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[expanded=true]:rotate-180"
                    aria-hidden="true"
                />
            </Button>
            <ul className={`grid w-full ${expanded ? "max-h-40" : "max-h-0"} overflow-hidden transition-[max-height] duration-300 ease-in`}>
                {getMenuContent(props.menuItem.submenu)}
            </ul>
        </>
    )
}

export default function SideNav() {

    const getNavLinks = useCallback(() => {
        return menus.map((menuItem) => {
            if (menuItem.submenu.length > 0) {
                return (
                    <SubMenuNavLink 
                        menuItem={menuItem}
                    />
                )
            } else {
                return (
                    <NavigationMenuItem key={menuItem.label} className="w-full">
                        <NavigationMenuLink href={menuItem.href}>
                            <Button className="w-full" variant="ghost">
                                {menuItem.label}
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                );
            }
        });
    }, []);

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size={"icon"}>
                        <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-1/4 p-0">
                    <ScrollArea className="w-full h-screen rounded-md">
                        <div className="min-w-full mt-9">
                            <NavigationMenu className="min-w-full rounded-md" orientation="vertical">
                                <div className="w-full">
                                    <NavigationMenuList className="flex flex-col min-w-full">
                                        {getNavLinks()}
                                    </NavigationMenuList>
                                </div>
                            </NavigationMenu>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    );
}
