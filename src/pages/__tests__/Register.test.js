import React from 'react';
import { shallow } from 'enzyme';

import Register from '../Register';
import { shallowToJson } from 'enzyme-to-json';

describe('render Register component', () => {
    it('should render Register page component', () => {
        const wrapper = shallow(<Register />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
