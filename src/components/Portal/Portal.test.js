import React from 'react';
import { shallow, mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Portal from './Portal';

describe('render Portal component', () => {
    const childJSX = <p>Child JSX</p>;
    let component;

    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    afterEach(() => {
        if (component) {
            component.unmount();
        }
    });

    it('should render correctly', () => {
        component = mount(<Portal>{childJSX}</Portal>);

        expect(mountToJson(component)).toMatchSnapshot();
    });
});
