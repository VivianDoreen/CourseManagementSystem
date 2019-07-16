import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/action/courseActions';
import * as authorActions from '../../redux/action/authorsActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { async } from 'q';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursesPage: false
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch((error) => alert('failed to load courses' + error));
    }
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch((error) => alert('failed to load authors' + error));
    }
  }
  handleDeleteCourse = async (course) => {
    toast.success('successfully deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error('delete failed' + error.message, { autoClose: false });
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirectToAddCoursesPage && <Redirect to="/course" />}
        <h1>Courses</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ margin_bottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursesPage: true })}>
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </React.Fragment>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = (state, ownProps) => {
  console.log(state.apiCallsInProgress, 'authors');
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
