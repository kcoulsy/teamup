import React from 'react';
import { shallow } from 'enzyme';

import Home from './../Home';
import { shallowToJson } from 'enzyme-to-json';

describe('render Home component', () => {
    it('should render Home page component', () => {
        const wrapper = shallow(<Home />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should allow modal to be toggled', () => {
        const wrapper = shallow(<Home />);

        expect(wrapper.find('Modal').prop('isActive')).toBe(true);
        wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
        expect(wrapper.find('Modal').prop('isActive')).toBe(false);
    });
});
