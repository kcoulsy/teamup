import React from 'react';
import { Card, Form, Button, notification, Input } from 'antd';
import { useHistory, Redirect } from 'react-router-dom';
import { PATH_TEAM_PROJECTS } from './../constants/pageRoutes';

import useTeams from '../hooks/useTeams';
import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateTeamPage = () => {
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
          {...layout}
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
          }}>
          <Form.Item label='Team Name' name='teamName'>
            <Input />
          </Form.Item>

          <Form.Item label='Team Description' name='teamDesc'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Create Team
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTeamPage;
