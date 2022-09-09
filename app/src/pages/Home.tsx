import React from 'react';
import { Card, List, Typography } from 'antd';
import TeamInvites from '../components/TeamInvites/TeamInvites';

const Home = () => {
  return (
    <div>
      <TeamInvites />
      <Card title='Welcome!'>
        <p>
          Thanks for checking out the project, the intent of this project is to
          have a full stack application as an example for my development skills.
        </p>
        <p>
          The purpose of the app is to track Projects and Tasks, for personal
          use or to use as a team. With teams there is a whole role and
          permissions system that can be customised to the teams requirements.
        </p>
        <p>
          The project is far from finished, currently in <b>v0.1</b>. With
          plenty of features planned, I will update this demo as major additions
          are added. You can check out the project on github{' '}
          <a href='https://github.com/kcoulsy/teamup'>here</a>.
        </p>
        <List
          header={
            <Typography.Title level={4} style={{ margin: 0 }}>
              Planned Features
            </Typography.Title>
          }
          dataSource={[
            'Comments on tasks for teams',
            'Work log to track time spent on tasks',
            'Activity log across teams',
            'User and team profiles',
            'Mobile Resposiveness',
          ]}
          size='small'
          renderItem={(item) => <List.Item>{item}</List.Item>}></List>
      </Card>
    </div>
  );
};

export default Home;
