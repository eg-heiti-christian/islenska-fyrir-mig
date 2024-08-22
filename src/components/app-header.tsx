"use-client"

import { NavigationMenuDemo } from '@/components/nav-links';
import { ModeToggle } from './ui/mode-toggle';

export function AppHeader() {

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
            <NavigationMenuDemo />
            <ModeToggle />
        </header>
    )
}