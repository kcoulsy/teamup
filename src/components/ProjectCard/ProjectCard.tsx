import React from 'react';
import { Card, Progress, Typography, Space } from 'antd';
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

interface ProjectCardProps {
    _id: string;
    title: string;
    description?: string;
    hoursLeft: number;
    completion: number;
}

const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
    _id,
    title,
    description = '',
    hoursLeft,
    completion,
}) => {
    const history = useHistory();
    const handleClick = () => {
        history.replace(`/project/${_id}`);
    };
    return (
        <Card
            title={title}
            bordered={false}
            style={{ marginBottom: '20px' }}
            size="small"
            hoverable
            onClick={handleClick}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Text type="secondary" style={{ marginBottom: '20px' }}>
                    {description.length > 100
                        ? description?.slice(0, 100) + '...'
                        : description}
                </Text>
                <Text style={{ marginBottom: '20px' }}>
                    {`${hoursLeft} hours left`}
                </Text>
                <Progress percent={completion} />
            </Space>
        </Card>
    );
};
export default ProjectCard;
