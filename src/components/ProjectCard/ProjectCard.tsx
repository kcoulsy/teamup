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
            className="project-card"
            size="small"
            hoverable
            onClick={handleClick}>
            <Space direction="vertical" className="project-card__space">
                <Text type="secondary" className="project-card__description">
                    {description.length > 100
                        ? description?.slice(0, 100) + '...'
                        : description}
                </Text>
                <Text className="project-card__hours-remaining">
                    {`${hoursLeft} hours left`}
                </Text>
                <Progress percent={completion} />
            </Space>
        </Card>
    );
};
export default ProjectCard;
