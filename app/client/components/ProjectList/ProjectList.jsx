import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { shape, bool, string } from 'prop-types';
import Project from '../Project';
import AllProjectsQuery from './AllProjects.graphql';

@graphql(AllProjectsQuery, {
  name: 'allProjectsQuery'
})
export default class ProjectList extends Component {
  static propTypes = {
    allProjectsQuery: shape({
      loading: bool.isRequired,
      allProjects: shape({
        id: string.isRequired,
        title: string.isRequired
      })
    }).isRequired
  };

  render() {
    return (
      <div>
        {!this.props.allProjectsQuery.loading &&
          this.props.allProjectsQuery.allProjects.map(project => (
            <Project key={project.id} title={project.title} />
          ))}
      </div>
    );
  }
}
