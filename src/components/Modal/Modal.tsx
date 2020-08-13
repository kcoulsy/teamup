import React from 'react';

import Portal from '../Portal/Portal';

export interface ModalAction {
    buttonLabel: string;
    onClick: Function;
    klasses: string;
}

interface ModalProps {
    isActive: boolean;
    headerTitle?: string;
    actions: ModalAction[];
}

const Modal: React.FunctionComponent<ModalProps> = ({ isActive = false, children, headerTitle, actions = [] }) => {
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

                                const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
                                    event.preventDefault();
                                    actionObj.onClick();
                                }

                                return (
                                    <div
                                        key={key}
                                        className={klasses}
                                        onClick={handleClick}>
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
};

export default Modal;
