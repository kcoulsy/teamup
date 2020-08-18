import React from 'react';
import { shallow } from 'enzyme';

import { shallowToJson } from 'enzyme-to-json';
import AppRouter from './AppRouter';

describe('render AppRouter component', () => {
    it('should render AppRouter component', () => {
        const wrapper = shallow(<AppRouter />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
