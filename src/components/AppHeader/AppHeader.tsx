import { ActionIcon, Title } from '@mantine/core';
import { Menu } from 'lucide-react';

interface Props {
    open: () => void
}
export const AppHeader = (props: Props) => {

    return (
        <div className='h-full w-full flex items-center text-center'>
            <div className='flex w-1/4'>
                <ActionIcon className='self-start ml-4' 
                    onClick={props.open} 
                    size="lg"
                    aria-label="Menu">
                    <Menu className='h-[1.2rem] w-[1.2rem]' />
                </ActionIcon>
            </div>

            <div className="w-full sm:w-1/2">
                <Title c='white' order={2}>
                    Íslenska Fyrir Mig
                </Title>
            </div>
            
            <div className='flex w-1/5 justify-end'>
                
            </div>
        </div>
    )
}