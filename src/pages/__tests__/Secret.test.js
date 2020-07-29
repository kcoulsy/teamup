import React from 'react';
import { shallow } from 'enzyme';

import Secret from '../Secret';
import { shallowToJson } from 'enzyme-to-json';

describe('render Secret component', () => {
    it('should render Secret page component', () => {
        const wrapper = shallow(<Secret />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
