import React from 'react';
import {
    Card,
    Typography,
    Row,
    Col,
    Comment,
    Tooltip,
    List,
    Form,
    Input,
    Button,
    Tag,
    Timeline,
} from 'antd';

const { Paragraph, Text, Link } = Typography;
const data = [
    {
        author: 'Han Solo',
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={'15/08/2020 18:45'}>
                <span>2 Days Ago</span>
            </Tooltip>
        ),
    },
    {
        author: 'Han Solo',
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={'15/08/2020 18:45'}>
                <span>2 Days Ago</span>
            </Tooltip>
        ),
    },
];

const TaskView: React.FunctionComponent = () => {
    return (
        <>
            <Card size="small" style={{ marginBottom: '16px' }}>
                <Row>
                    <Col span={8}>
                        <Text strong style={{ paddingRight: 5 }}>
                            Assignee:
                        </Text>
                        <Link>John Smith</Link>
                    </Col>
                    <Col span={8}>
                        <Text strong style={{ paddingRight: 5 }}>
                            Status:
                        </Text>
                        <Tag color="gold">In Progress</Tag>
                    </Col>
                    <Col span={8}>
                        <Text strong style={{ paddingRight: 5 }}>
                            Estimated Time Remaining:
                        </Text>
                        <Text>17 Hours</Text>
                    </Col>
                </Row>
            </Card>
            <Card size="small" style={{ marginBottom: '16px' }}>
                <Paragraph
                    ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                    Ant Design, a design language for background applications,
                    is refined by Ant UED Team. Ant Design, a design language
                    for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is
                    refined by Ant UED Team. Ant Design, a design language for
                    background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is
                    refined by Ant UED Team. Ant Design, a design language for
                    background applications, is refined by Ant UED Team.
                </Paragraph>
            </Card>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title="Work Log" size="small">
                        <Timeline>
                            <Timeline.Item>
                                John Smith / 3 Hours / 14-08-2020
                            </Timeline.Item>
                            <Timeline.Item>
                                John Smith / 1 Hours / 13-08-2020
                            </Timeline.Item>
                            <Timeline.Item>
                                Mike Johnson / 2 Hours / 11-08-2020
                            </Timeline.Item>
                            <Timeline.Item>
                                Sarah Green / 4 Hours / 10-08-2020
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        title={`Comments (${data.length} replies)`}
                        size="small">
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item) => (
                                <li>
                                    <Comment
                                        author={item.author}
                                        avatar={item.avatar}
                                        content={item.content}
                                        datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />
                        <Form.Item>
                            <Input.TextArea rows={4} onChange={() => {}} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                loading={false}
                                onClick={() => {}}
                                type="primary">
                                Add Comment
                            </Button>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default TaskView;
