import { createStore } from 'redux';
import rootReducer from './reducers';
import * as courseActions from './action/courseActions';
import initialState from './reducers/initialState';

it('gfd', () => {
  const store = createStore(rootReducer, initialState);
  const course = {
    title: 'A'
  };

  //act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  //comparison
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
