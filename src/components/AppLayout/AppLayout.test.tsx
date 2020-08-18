import React from 'react';
import { shallow } from 'enzyme';

import AppLayout from './AppLayout';
import { shallowToJson } from 'enzyme-to-json';

describe('render AppLayout component', () => {
    it('should render AppLayout component', () => {
        const child = () => <p>JSX Child</p>;
        const wrapper = shallow(<AppLayout>{child}</AppLayout>);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})