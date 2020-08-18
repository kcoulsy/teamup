import React from 'react';
import { shallow } from 'enzyme';

import Loader from './Loader';
import { shallowToJson } from 'enzyme-to-json';

describe('render Loader component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Loader isLoading={false} />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render as active when isLoading is true', () => {
        const wrapper = shallow(<Loader isLoading />);

        expect(wrapper.find('.active').length).toBe(1);
        expect(shallowToJson(wrapper)).toMatchSnapshot();

        wrapper.setProps({ isLoading: false });
        expect(wrapper.find('.active').length).toBe(0);
    });

    it('should render as inverted when dark is false (inverted = light theme)', () => {
        const wrapper = shallow(<Loader isLoading={false} />);

        expect(wrapper.find('.inverted').length).toBe(1);
        expect(shallowToJson(wrapper)).toMatchSnapshot();

        wrapper.setProps({ dark: true });
        expect(wrapper.find('.inverted').length).toBe(0);
    });

    it('should render children correctly', () => {
        const wrapper = shallow(
            <Loader isLoading={false}>
                <p>JSX Child</p>
            </Loader>
        );

        expect(wrapper.contains(<p>JSX Child</p>)).toBe(true);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
