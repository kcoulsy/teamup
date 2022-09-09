import React from 'react';
import { Form, Input, Button, notification, Modal, PageHeader } from 'antd';
import { PERM_UPDATE_TEAM_DETAILS } from '../../../constants/permissions';
import { Store } from 'antd/lib/form/interface';
import useTeams from '../../../hooks/useTeams';

const { confirm } = Modal;

const GeneralSettings = () => {
  const { team, updateTeam, hasPermission } = useTeams();
  const canUpdateTeamSettings = hasPermission(PERM_UPDATE_TEAM_DETAILS);
  const teamName = team ? team.name : '';
  const teamDesc = team ? team.description : '';

  const leaveTeam = () => alert('TODO');
  const handleUpdate = async ({ teamName, teamDesc }: Store) => {
    try {
      await updateTeam({
        name: teamName,
        description: teamDesc,
      });

      notification.success({
        message: 'Team updated successfully!',
        placement: 'bottomRight',
      });
    } catch (error) {
      notification.error({
        message: 'Something went wrong updating team!',
        placement: 'bottomRight',
      });
    }
  };

  return (
    <div>
      <PageHeader
        title='General Settings'
        subTitle={
          !canUpdateTeamSettings
            ? 'You do not have permissions to update team settings.'
            : undefined
        }
        className='team-settings__page-header'
      />
      <Form
        labelCol={{
          sm: {
            span: 24,
          },
          md: {
            span: 8,
          },
        }}
        wrapperCol={{
          sm: {
            span: 24,
          },
          md: {
            span: 12,
          },
        }}
        name='teamGeneral'
        initialValues={{ teamName, teamDesc }}
        onFinish={handleUpdate}>
        <Form.Item label='Team Name' name='teamName'>
          <Input disabled={!canUpdateTeamSettings} />
        </Form.Item>

        <Form.Item label='Team Description' name='teamDesc'>
          <Input.TextArea disabled={!canUpdateTeamSettings} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            md: {
              offset: 8,
              span: 16,
            },
            sm: {
              offset: 0,
              span: 16,
            },
          }}>
          <Button
            type='primary'
            htmlType='submit'
            disabled={!canUpdateTeamSettings}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button
        danger
        onClick={async () => {
          confirm({
            title: 'Leave Team?',
            content:
              'Leaving the team will prevent you from accessing the teams projects.',
            onOk: async () => {
              const done = await leaveTeam();
              // TODO - notification
              //   if (done) {
              //     notification.success({
              //       message: 'Successfully left the team',
              //     });
              //     history.push(PATH_HOME);
              //   }
            },
          });
        }}>
        Leave Team
      </Button>
    </div>
  );
};

export default GeneralSettings;
