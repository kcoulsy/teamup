import React from 'react';
import { Alert, notification, Modal } from 'antd';
import useUser from '../../hooks/useUser';
import { api } from '../../services/api';

const { confirm } = Modal;

function TeamInvites() {
  const { data, refetch } = useUser();

  const teamInvitesId = data?.user?.teamInviteIDs || [];

  return (
    <div>
      {teamInvitesId.map((teamId) => (
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
                try {
                  await api('/team/accept', 'POST', { teamId });

                  notification.success({
                    message: 'You have joined the team successfully!',
                  });

                  await refetch();
                } catch (error) {
                  notification.error({
                    message: 'Something went wrong when joining team',
                  });
                }
              },
              onCancel: async () => {
                try {
                  await api('/team/reject', 'POST', { teamId });

                  notification.success({
                    message: `You have declined an invitation from the team "${teamId}".`,
                  });

                  await refetch();
                } catch (error) {
                  notification.error({
                    message: 'Something went wrong when joining team',
                  });
                }
              },
            });
          }}
        />
      ))}
    </div>
  );
}

export default TeamInvites;
