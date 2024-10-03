import { Outlet } from "react-router-dom";

import { AppShell, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { AppHeader } from '../AppHeader/AppHeader';
import { Navbar } from '../Navbar/Navbar';

export const Layout = () => {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <AppShell
            padding="md"
            header={{ height: 60 }}>

            <AppShell.Header>
                <AppHeader 
                    open={open}
                />
            </AppShell.Header>
            
            <Drawer opened={opened} size="xs" onClose={close}>
                <Navbar onNavLinkClick={close} />
            </Drawer>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
            
        </AppShell>
    )
}