import React from 'react';
import { Card, List, Typography, Alert, Modal } from 'antd';
import useUser from '../hooks/useUser';

const { confirm } = Modal;

const Home = () => {
  const { data } = useUser();

  // TODO include in response
  const teamInvitesId = data?.user?.teamInviteIDs || [];

  // TODO call and mutate
  const acceptTeamInvite = async () => alert('Accept Team Invite');
  const declineTeamInvite = async () => alert('Decline Team Invite');
  return (
    <div>
      {teamInvitesId.map((teamId) => {
        return (
          <Alert
            key={teamId}
            message={`You have been invited to join the team "${teamId}"`}
            closeText='Respond'
            className='page__page-header'
            style={{ marginBottom: '20px' }}
            onClose={() => {
              confirm({
                title: 'Join Team',
                content:
                  'Are you sure you want to join this team? You can only join one.',
                okText: 'Accept',
                cancelText: 'Decline',
                onOk: async () => {
                  //   const accepted = await acceptTeamInvite(teamId);
                  //   if (accepted) {
                  //     notification.success({
                  //       message: 'You have joined the team successfully!',
                  //     });
                  //   } else {
                  //     notification.error({
                  //       message: 'Something went wrong when joining team',
                  //     });
                  //   }
                },
                onCancel: async () => {
                  //   try {
                  //     const declined = await declineTeamInvite(teamId);
                  //     if (declined) {
                  //       notification.success({
                  //         message: `You have declined an invitation from the team "${team.name}".`,
                  //       });
                  //     } else {
                  //       notification.error({
                  //         message: 'Something went wrong when joining team',
                  //       });
                  //     }
                  //   } catch (err) {
                  //     console.log('ERROR', err);
                  //   }
                },
              });
            }}
          />
        );
      })}
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
