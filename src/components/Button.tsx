import React, { useRef } from 'react';

import { Spinner } from './Spinner';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean;
}

export const Button = (props: Props) => {

    const buttonRef = useRef<HTMLButtonElement>(null);
    

    const {
        loading,
        ...buttonProps
    } = props;

    let minWidth = undefined;
    let minHeight = undefined;
    let style = undefined;
    if (buttonRef.current && loading) {
        minWidth = buttonRef.current.offsetWidth;
        minHeight = buttonRef.current.offsetHeight;
        style = {
            minWidth,
            minHeight
        };
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            {...buttonProps}
        >
            <div style={{position: 'relative'}}>
                <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: (loading ? 'block' : 'none')}}>
                        <Spinner />
                </span>
                <span style={{visibility: (loading) ? 'hidden': 'visible'}}>{props.children}</span>
            </div>
        </button>
    )


};