import React, { Fragment } from 'react';

function Loader({ isLoading, loadingText, dark, children }) {
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
