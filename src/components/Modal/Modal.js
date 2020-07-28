import React from 'react';

import Portal from './../Portal/Portal';

/**
 * Modal
 *
 * @param {actionsObject[]} actions - an array of objects containing button details
 *
 * @interface actionsObject
 * @type {Object}
 * @property {string} buttonLabel -label for the buttons
 * @property {function} onClick - onClick event handlers
 * @property {string} klasses - single string appended to existing classNames
 */
function Modal({ isActive = false, children, headerTitle, actions = [] }) {
    return (
        <Portal>
            <div
                className={`ui dimmer modals page visible ${isActive ? ' active' : ''}`}
                style={{ display: 'flex !important' }}>
                <div className="ui standard test modal visible active front" style={{ display: 'flex !important' }}>
                    {headerTitle ? <div className="header">{headerTitle}</div> : null}
                    <div className="content">{children}</div>
                    <div className="actions"></div>
                    {actions.length ? (
                        <div className="actions">
                            {actions.map((actionObj, i) => {
                                let klasses = 'ui button';
                                const key = actionObj.buttonLabel + '_' + i;

                                if (actionObj.klasses) klasses += ` ${actionObj.klasses}`;

                                return (
                                    <div key={key} className={klasses} onClick={actionObj.onClick}>
                                        {actionObj.buttonLabel}
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        </Portal>
    );
}

export default Modal;
