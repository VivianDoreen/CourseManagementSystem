import * as types from './actionTypes';
import * as courseAction from './courseActions';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import { courses } from '../../../tools/mockData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async action', () => {
  afterEach(() => {
    fetchMock.restore();
  });
});

describe('sdfvkjsdf', () => {
  it('gfhf', () => {
    fetchMock.mock('*', {
      body: courses,
      headers: { 'content-type': 'application/json' }
    });
    const expectedAction = [
      {
        type: types.BEGIN_API_CALL
      },
      {
        type: types.LOAD_COURSES_SUCCESS,
        courses
      }
    ];
    const store = mockStore({ courses: [] });
    return store.dispatch(courseAction.loadCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('create course success', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    const course = {
      title: 'course1',
      category: 'math',
      author: 'Vivian'
    };
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };
    const action = courseAction.createCourseSuccess(course);
    expect(action).toEqual(expectedAction);
  });
});
