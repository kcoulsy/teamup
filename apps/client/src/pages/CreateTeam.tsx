import React from 'react';
import { Card, Form, Button, notification, Input } from 'antd';
import { useHistory, Redirect } from 'react-router-dom';
import { PATH_TEAM_PROJECTS } from '../constants/pageRoutes';

import useTeams from '../hooks/useTeams';

function CreateTeamPage() {
  const { hasTeam, createTeamMutation } = useTeams();
  const history = useHistory();

  if (hasTeam) {
    // TODO: this should redirect in router
    return <Redirect to={PATH_TEAM_PROJECTS} />;
  }

  return (
    <div>
      <Card title='Create Team'>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={async ({ teamName, teamDesc }) => {
            await createTeamMutation.mutate({
              name: teamName,
              description: teamDesc,
            });
            notification.success({
              message: 'Team Created',
              placement: 'bottomRight',
            });
            history.push(PATH_TEAM_PROJECTS);
          }}
        >
          <Form.Item label='Team Name' name='teamName'>
            <Input />
          </Form.Item>

          <Form.Item label='Team Description' name='teamDesc'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Create Team
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default CreateTeamPage;
