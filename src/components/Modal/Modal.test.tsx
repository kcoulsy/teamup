import React from 'react';
import { shallow, mount } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';
import { shallowToJson } from 'enzyme-to-json';
import Modal from './Modal';

describe('modal component', () => {
  test('should render modal correctly', () => {
    const wrapper = shallow(<Modal isActive={false} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('should be active if isActive is true', () => {
    const wrapper = shallow(<Modal isActive />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.page.active').length).toBe(1);

    wrapper.setProps({ isActive: false });
    expect(wrapper.find('.page.active').length).toBe(0);
  });

  test('should render children', () => {
    const wrapper = shallow(
      <Modal isActive>
        <p>JSX Child</p>
      </Modal>
    );

    expect(wrapper.contains(<p>JSX Child</p>)).toBe(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('should render headerTitle', () => {
    const title = 'test title';
    const wrapper = shallow(<Modal isActive headerTitle={title} />);

    expect(wrapper.contains(title)).toBe(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    const titleWithJSX = <h4>Test Title</h4>;
    const wrapperWithJSX = shallow(
      <Modal isActive headerTitle={titleWithJSX} />
    );

    expect(wrapperWithJSX.contains(titleWithJSX)).toBe(true);
    expect(shallowToJson(wrapperWithJSX)).toMatchSnapshot();
  });

  test('should render buttons when actions are passed', () => {
    let count = 0;
    const incLabel = 'Inc';
    const decLabel = 'Dec';
    const actions = [
      {
        buttonLabel: incLabel,
        onClick: () => {
          count++;
        },
        klasses: 'testbutton',
      },
      {
        buttonLabel: decLabel,
        onClick: () => {
          count--;
        },
      },
    ];

    const wrapper = shallow(<Modal isActive actions={actions} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    const buttonWrapper = wrapper.find('.testbutton');

    expect(buttonWrapper.length).toBe(1);
    expect(buttonWrapper.contains(incLabel)).toBe(true);
    expect(count).toBe(0);
    buttonWrapper.simulate('click', { preventDefault: vi.fn() });
    expect(count).toBe(1);
  });
});
