"use client"

import React, { useState, useCallback } from "react"

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

type Menu = {
    label: string
    submenu?: Submenu[]
    href: string
}

type Submenu = {
    label: string
    href: string
}

const menus: Menu[] = [
    {
        label: "Home",
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

export default function SideNav() {

    const getMenuContent = (submenus: Submenu[]) => {
        return submenus.map((submenuItem) => {
            return (
                <li className="col-span-1">
                    <NavigationMenuItem className="w-56">
                        <NavigationMenuLink href={submenuItem.href}>
                            <Button className="w-56" variant="ghost">
                                {submenuItem.label}
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </li>
            )
        })
    }
    const getNavLinks = useCallback(() => {
        return menus.map((menuItem) => {
            if (menuItem.submenu) {
                return (
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="w-56">
                            {menuItem.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-56">
                            <ul className="grid w-56">
                                {getMenuContent(menuItem.submenu)}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                )
            } else {
                return (
                    <NavigationMenuItem className="flex">
                        <NavigationMenuLink className="" href={menuItem.href} asChild>
                            <Button className="w-56" variant="ghost">
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
                <SheetContent side="left" className="w-56 p-0">
                    <ScrollArea className="h-screen rounded-md">
                        <div className="w-56 mt-9">
                            <NavigationMenu className="rounded-md" orientation="vertical">
                                <NavigationMenuList className="flex flex-col">
                                    {getNavLinks()}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    );
}
