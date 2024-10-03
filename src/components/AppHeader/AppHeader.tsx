import { ActionIcon } from '@mantine/core';
import { Menu } from 'lucide-react';

import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

interface Props {
    open: () => void
}
export const AppHeader = (props: Props) => {

    return (
        <div className='h-full w-full flex items-center mx-4 gap-4 text-center'>
            <div className='flex w-1/4 '>
                <ActionIcon className='self-start' 
                    onClick={props.open} 
                    size="lg"
                    aria-label="Menu">
                    <Menu className='h-[1.2rem] w-[1.2rem]' />
                </ActionIcon>
            </div>

            <div className="w-1/2">
                Íslenska Fyrir Mig
            </div>
            
            <div className='flex w-1/5 justify-end'>
                <ThemeToggle />
            </div>
        </div>
    )
}