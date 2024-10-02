import { AppShell, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { AppHeader } from '../AppHeader/AppHeader';


interface Props {
    children: React.ReactNode
}
export const Layout = (props: Props) => {

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
                Navbar
            </Drawer>

            <AppShell.Main>
                
                {props.children}
            </AppShell.Main>
            
        </AppShell>
    )
}