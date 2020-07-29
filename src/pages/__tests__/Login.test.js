import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Login';
import { shallowToJson } from 'enzyme-to-json';

describe('render Login component', () => {
    it('should render Login page component', () => {
        const wrapper = shallow(<Login />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
