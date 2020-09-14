import React from 'react';
import { Col, Row } from 'antd';
import ProjectCard from './../ProjectCard/ProjectCard';
import { Project } from './../../types/project';

const ProjectBrowser: React.FunctionComponent<{ projects: Project[] }> = ({
    projects,
}) => {
    return (
        <div className="site-card-wrapper">
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
