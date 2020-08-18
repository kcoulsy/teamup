import React from 'react';

interface CardProps {
    title?: string;
    centered?: boolean;
    fluid?: boolean;
}

const Card : React.FunctionComponent<CardProps> = ({ title, children, centered, fluid }) => {
    let classNames = 'ui card';

    if (centered) classNames += ' centered';
    if (fluid) classNames += ' fluid';

    return (
        <div className={classNames}>
            {title ? (
                <div className="content">
                    <div className="header">{title}</div>
                </div>
            ) : null}
            <div className="content">{children}</div>
        </div>
    );
}

export default Card;
