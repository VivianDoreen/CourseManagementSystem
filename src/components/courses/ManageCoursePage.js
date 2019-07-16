import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/action/courseActions';
import { loadAuthors } from '../../redux/action/authorsActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => alert('failed to load courses' + error));
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert('failed to load authors' + error));
    }
  }, [props.course]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
    console.log(event.target.value, 'name');
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!authorId) errors.author = 'Author is required';
    if (!category) errors.category = 'Category is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('course saved');
        history.push('/courses');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };
  return authors.length == 0 || courses.length == 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const getCourseBySlug = (courses, slug) => {
  return courses.find((course) => course.slug === slug || null);
};
const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
