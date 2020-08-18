import React from 'react';
import { shallow } from 'enzyme';

import { shallowToJson } from 'enzyme-to-json';
import { App } from './App';

describe('render AppRouter component', () => {
    it('should render AppRouter component', () => {
        const initialise = jest.fn();
        const wrapper = shallow(<App initialise={initialise} />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
        expect(initialise.mock.calls.length).toBeGreaterThan(0);
    });
});
