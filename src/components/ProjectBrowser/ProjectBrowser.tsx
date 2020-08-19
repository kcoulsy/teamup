import React from 'react';
import { Col, Row } from 'antd';
import ProjectCard from './../ProjectCard/ProjectCard';

const ProjectBrowser: React.FunctionComponent = () => {
    const projects = new Array(10).fill('test');
    const sampleDesc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    {projects.map((project, index) => {
                        if (index % 3 === 0) {
                            return <ProjectCard key={index} title={`Project Num ${index}`} description={sampleDesc} />;
                        }
                    })}
                </Col>
                <Col span={8}>
                    {projects.map((project, index) => {
                        if (index % 3 === 1) {
                            return <ProjectCard key={index} title={`Project ${index}`} description={sampleDesc} />;
                        }
                    })}
                </Col>
                <Col span={8}>
                    {projects.map((project, index) => {
                        if (index % 3 === 2) {
                            return <ProjectCard key={index} title={`Project ${index}`} description={sampleDesc} />;
                        }
                    })}
                </Col>
            </Row>
        </div>
    );
};

export default ProjectBrowser;