import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { apiCallStatus, apiCallError } from './apiStatusActions';
export const loadCoursesSuccess = (courses) => {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
};

export const updateCourseSuccess = (course) => {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
};
export const createCourseSuccess = (course) => {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
};

export const deleteCourseOptimistic = (course) => {
  return {
    type: types.DELETE_COURSE_OPTIMISTIC,
    course
  };
};

export const loadCourses = () => (dispatch, getState) => {
  dispatch(apiCallStatus());
  return courseApi
    .getCourses()
    .then((courses) => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};

export const saveCourse = (course) => (dispatch, getState) => {
  dispatch(apiCallStatus());
  return courseApi
    .saveCourse(course)
    .then((savedCourse) => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    })
    .catch((error) => {
      dispatch(apiCallError(error));
      throw error;
    });
};

export const deleteCourse = (course) => (dispatch, getState) => {
  dispatch(deleteCourseOptimistic(course));
  return courseApi.deleteCourse(course.id);
};
