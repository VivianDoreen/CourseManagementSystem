import * as actions from '../action/courseActions';
import * as types from '../action/actionTypes';
import courseReducer from './courseReducer';

describe('test course reducer', () => {
  it('should test course reducer', () => {
    const initialState = [
      {
        id: 1,
        title: 'A'
      },
      {
        id: 2,
        title: 'B'
      },
      { id: 3, title: 'C' }
    ];
    const course = {
      id: 3,
      title: 'D'
    };
    const action = actions.updateCourseSuccess(course);

    const newState = courseReducer(initialState, action);
    const updatedState = newState.find((a) => a.id == course.id);
    const untouchedState = newState.find((a) => a.id == 1);
    expect(updatedState.title).toEqual('D');
    expect(untouchedState.title).toEqual('A');
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('D');
  });
});
