import React from 'react';
import { mount } from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';
import { courses, authors, newCourse } from '../../../tools/mockData';
import { wrap } from 'module';

const render = (args) => {
  const defaultProps = {
    courses,
    authors,
    loadCourses: jest.fn(),
    loadAuthors: jest.fn(),
    saveCourse: jest.fn(),
    history: {},
    course: newCourse,
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
};
it('should render component', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  let error = wrapper.find('.alert').first();
  expect(error.text()).toBe('Title is required');
});
