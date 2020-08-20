import React from 'react';
import { Card, Progress, Typography, Space } from 'antd';
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

interface ProjectCardProps {
    title: string;
    description?: string;
}

const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({ title, description = '' }) => {
    const history = useHistory();
    const handleClick = () => {
        history.replace('/project/123');
    }
    return (
        <Card title={title} bordered={false} style={{marginBottom: '20px'}} size="small" hoverable onClick={handleClick}>
            <Space direction="vertical">
                <Text type="secondary" style={{marginBottom: '20px'}}>{description.length > 100 ? description?.slice(0, 100) + '...' : description}</Text>
                <Text style={{marginBottom: '20px'}}>Estimated Completion Time: 2 Weeks</Text>
                <Progress percent={parseInt((Math.random() * 100).toFixed(), 10)} />
            </Space>
        </Card>
    );
};
export default ProjectCard;
