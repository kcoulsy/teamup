import React from 'react';
import { Card, Typography, Row, Col, Tag, Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Task } from '../../types/task';
import { PATH_HOME } from '../../constants/pageRoutes';

const { Paragraph, Text } = Typography;
// const data = [
//     {
//         author: 'Han Solo',
//         avatar:
//             'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         content: (
//             <p>
//                 We supply a series of design principles, practical patterns and
//                 high quality design resources (Sketch and Axure), to help people
//                 create their product prototypes beautifully and efficiently.
//             </p>
//         ),
//         datetime: (
//             <Tooltip title={'15/08/2020 18:45'}>
//                 <span>2 Days Ago</span>
//             </Tooltip>
//         ),
//     },
//     {
//         author: 'Han Solo',
//         avatar:
//             'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         content: (
//             <p>
//                 We supply a series of design principles, practical patterns and
//                 high quality design resources (Sketch and Axure), to help people
//                 create their product prototypes beautifully and efficiently.
//             </p>
//         ),
//         datetime: (
//             <Tooltip title={'15/08/2020 18:45'}>
//                 <span>2 Days Ago</span>
//             </Tooltip>
//         ),
//     },
// ];

interface TaskViewProps {
  task?: Task;
}

function TaskView({ task }: TaskViewProps) {
  const history = useHistory();
  if (!task) {
    return (
      <Result
        status='warning'
        title='This task does not exist!.'
        extra={
          <Button
            type='primary'
            key='console'
            onClick={() => {
              history.push(PATH_HOME);
            }}
          >
            Back to dashboard
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Card size='small' className='task-view'>
        <Row>
          <Col span={8}>
            <Text strong className='task-view__assignee'>
              Assignee:
            </Text>
            <button type='button'>{task.assignee ? task.assignee.email : 'Unassigned'}</button>
          </Col>
          <Col span={8}>
            <Text strong className='task-view__status'>
              Status:
            </Text>
            <Tag color={task.status.color}>{task.status.label}</Tag>
          </Col>
          <Col span={8}>
            <Text strong className='task-view__time'>
              Estimated Time Remaining:
            </Text>
            <Text>{task.estimatedHours}</Text>
          </Col>
        </Row>
      </Card>
      <Card size='small' className='task-view__description'>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
          {task.description}
        </Paragraph>
      </Card>
      {/* <Row gutter={[16, 16]}>
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
                  </Row> */}
    </>
  );
}

export default TaskView;
