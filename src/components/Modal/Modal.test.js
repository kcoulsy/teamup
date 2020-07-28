import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Modal from './Modal';

describe('render modal component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Modal />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should be active if isActive is true', () => {
        const wrapper = shallow(<Modal isActive />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('.page.active').length).toBe(1);

        wrapper.setProps({ isActive: false });
        expect(wrapper.find('.page.active').length).toBe(0);
    });

    it('should render children', () => {
        const wrapper = shallow(
            <Modal>
                <p>JSX Child</p>
            </Modal>
        );

        expect(wrapper.contains(<p>JSX Child</p>)).toBe(true);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render headerTitle', () => {
        const title = 'test title';
        const wrapper = shallow(<Modal headerTitle={title} />);

        expect(wrapper.contains(title)).toBe(true);
        expect(shallowToJson(wrapper)).toMatchSnapshot();

        const titleWithJSX = <h4>Test Title</h4>;
        const wrapperWithJSX = shallow(<Modal headerTitle={titleWithJSX} />);

        expect(wrapperWithJSX.contains(titleWithJSX)).toBe(true);
        expect(shallowToJson(wrapperWithJSX)).toMatchSnapshot();
    });

    it('should render buttons when actions are passed', () => {
        let count = 0;
        const buttonLabel = 'Test Button';
        const actions = [
            {
                buttonLabel,
                onClick: () => {
                    count++;
                },
                klasses: 'testbutton',
            },
        ];

        const wrapper = shallow(<Modal actions={actions} />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();

        const buttonWrapper = wrapper.find('.testbutton');

        expect(buttonWrapper.length).toBe(1);
        expect(buttonWrapper.contains(buttonLabel)).toBe(true);
        expect(count).toBe(0);
        buttonWrapper.simulate('click');
        expect(count).toBe(1);
    });
});
