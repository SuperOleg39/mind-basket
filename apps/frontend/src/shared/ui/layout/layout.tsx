import React from 'react';

export const Layout = ({
    sidebar,
    main,
}: {
    sidebar: React.ReactNode;
    main: React.ReactNode;
}) => {
    return (
        <div>
            <div>{sidebar}</div>
            <div>{main}</div>
        </div>
    );
};
