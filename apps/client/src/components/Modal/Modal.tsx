import React, { MouseEvent, PropsWithChildren } from 'react';

import Portal from '../Portal/Portal';

export interface ModalAction {
  buttonLabel: string;
  onClick: Function;
  klasses?: string;
}

interface ModalProps {
  isActive: boolean;
  headerTitle?: string | JSX.Element;
  actions?: ModalAction[];
}

function Modal({
  isActive = false,
  children,
  headerTitle,
  actions = [],
}: PropsWithChildren<ModalProps>) {
  return (
    <Portal>
      <div
        className={`ui dimmer modals page visible ${isActive ? ' active' : ''}`}
        style={{ display: 'flex !important' }}
      >
        <div
          className='ui standard test modal visible active front'
          style={{ display: 'flex !important' }}
        >
          {headerTitle ? <div className='header'>{headerTitle}</div> : null}
          <div className='content'>{children}</div>
          <div className='actions' />
          {actions.length ? (
            <div className='actions'>
              {actions.map((actionObj, i) => {
                let klasses = 'ui button';
                const key = `${actionObj.buttonLabel}_${i}`;

                if (actionObj.klasses) klasses += ` ${actionObj.klasses}`;

                const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  actionObj.onClick();
                };

                return (
                  <button type='button' key={key} className={klasses} onClick={handleClick}>
                    {actionObj.buttonLabel}
                  </button>
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
