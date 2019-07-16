import React from 'react';
import CourseForm from './CourseForm';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

const renderCourseForm = (args) => {
  const defaultProps = {
    course: {},
    authors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {}
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
};
it('should render the add course header', () => {
  const { getByText } = renderCourseForm();
  getByText('Add Course');
});

it('should set the button label"save" when saving is false', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});
it('should set the button label "Saving" when saving is true', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving');
});
