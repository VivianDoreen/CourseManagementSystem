import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';

const renderComponent = (args) => {
  const defaultProps = {
    course: {},
    authors: [],
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
};

it('should render a form and header', () => {
  const wrapper = renderComponent();
  //   console.log(wrapper.debug());
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Course');
  expect(wrapper.find('TextInput').length).toBe(2);
  expect(wrapper.find('SelectInput').length).toBe(1);
});

it('set button label "save" when saving is false', () => {
  const wrapper = renderComponent();
  expect(wrapper.find('button').text()).toEqual('Save');
});

it('set button label "saving" when saving is true', () => {
  const wrapper = renderComponent({ saving: true });
  expect(wrapper.find('button').text()).toEqual('Saving');
});
