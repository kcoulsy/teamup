import React, { Fragment } from 'react';

interface LoaderProps {
    isLoading: boolean;
    loadingText?: string;
    dark?: boolean;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ isLoading, loadingText, dark, children }) => {
    let classNames = 'ui dimmer';

    if (isLoading) classNames += ' active';
    if (!dark) classNames += ' inverted'; // Light mode should be default

    return (
        <Fragment>
            <div className={classNames}>
                <div className="ui text loader">{loadingText}</div>
            </div>
            {children}
        </Fragment>
    );
}

export default Loader;
