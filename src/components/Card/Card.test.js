import React from 'react';
import { shallow } from 'enzyme';

import Card from './Card';
import { shallowToJson } from 'enzyme-to-json';

describe('render Card component', () => {
    it('should render Card component', () => {
        const wrapper = shallow(<Card />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render Card component with a title', () => {
        const title = 'Test Title';
        const wrapper = shallow(<Card title={title} />);

        expect(wrapper.contains(title)).toBe(true);
        expect(shallowToJson(wrapper)).toMatchSnapshot();

        wrapper.setProps({ title: undefined });
        expect(wrapper.find('.header').length).toBe(0);
    });

    it('should render Card component with centered class', () => {
        const wrapper = shallow(<Card centered />);

        expect(wrapper.find('.centered').length).toBe(1);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render Card component with fluid class', () => {
        const wrapper = shallow(<Card fluid />);

        expect(wrapper.find('.fluid').length).toBe(1);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render Card component with children', () => {
        const wrapper = shallow(
            <Card>
                <p>Child JSX</p>
            </Card>
        );

        expect(wrapper.contains(<p>Child JSX</p>)).toBe(true);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
