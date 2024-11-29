import React from 'react';

export const Container: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div className={'container'}>
            {children}
        </div>
    );
};