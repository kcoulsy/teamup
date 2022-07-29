import React from 'react';
import { Col, Row } from 'antd';
import ProjectCard from './../ProjectCard/ProjectCard';
import { Project } from './../../types/project';

const ProjectBrowser: React.FunctionComponent<{
  projects: Project[];
  completionData: any;
}> = ({ projects, completionData }) => {
  function getCompletionPercentage(id: string) {
    if (!completionData[id]) return 0;
    if (completionData[id].totalTime === 0) return 0;
    const { complete, totalTime } = completionData[id];
    return parseInt(((complete / totalTime) * 100).toFixed(2), 10);
  }
  function getHoursLeft(id: string) {
    if (!completionData[id]) return 0;
    if (completionData[id].totalTime === 0) return 0;
    const { complete, totalTime } = completionData[id];
    return totalTime - complete;
  }
  return (
    <div className='site-card-wrapper'>
      <Row gutter={16}>
        <Col span={8}>
          {projects.map((project, index) => {
            if (index % 3 === 0) {
              return (
                <ProjectCard
                  _id={project._id}
                  key={index}
                  title={project.title}
                  description={project.description}
                  hoursLeft={getHoursLeft(project._id)}
                  completion={getCompletionPercentage(project._id)}
                />
              );
            }
            return null;
          })}
        </Col>
        <Col span={8}>
          {projects.map((project, index) => {
            if (index % 3 === 1) {
              return (
                <ProjectCard
                  _id={project._id}
                  key={index}
                  title={project.title}
                  description={project.description}
                  hoursLeft={getHoursLeft(project._id)}
                  completion={getCompletionPercentage(project._id)}
                />
              );
            }
            return null;
          })}
        </Col>
        <Col span={8}>
          {projects.map((project, index) => {
            if (index % 3 === 2) {
              return (
                <ProjectCard
                  _id={project._id}
                  key={index}
                  title={project.title}
                  description={project.description}
                  hoursLeft={getHoursLeft(project._id)}
                  completion={getCompletionPercentage(project._id)}
                />
              );
            }
            return null;
          })}
        </Col>
      </Row>
    </div>
  );
};

export default ProjectBrowser;
