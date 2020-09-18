import React from 'react';
import { Alert, Modal, notification } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/configure';
import { Team } from '../types/team';
import { acceptTeamInvite } from '../actions/team';
import { declineTeamInvite } from './../actions/team';

const { confirm } = Modal;

interface HomeProps {
    teamInvites: Team[];
    acceptTeamInvite: Function;
    declineTeamInvite: Function;
}
const Home: React.FunctionComponent<HomeProps> = ({
    teamInvites,
    acceptTeamInvite,
    declineTeamInvite,
}) => {
    return (
        <div>
            {teamInvites.map((team) => {
                return (
                    <Alert
                        key={team._id}
                        message={`You have been invited to join the team "${team.name}"`}
                        closeText="Respond"
                        style={{ marginBottom: '20px' }}
                        onClose={() => {
                            confirm({
                                title: 'Join Team',
                                content:
                                    'Are you sure you want to join this team? You can only join one.',
                                okText: 'Accept',
                                cancelText: 'Decline',
                                onOk: async () => {
                                    const accepted = await acceptTeamInvite(
                                        team._id
                                    );
                                    if (accepted) {
                                        notification.success({
                                            message:
                                                'You have joined the team successfully!',
                                        });
                                    } else {
                                        notification.error({
                                            message:
                                                'Something went wrong when joining team',
                                        });
                                    }
                                },
                                onCancel: async () => {
                                    try {
                                        const declined = await declineTeamInvite(
                                            team._id
                                        );
                                        if (declined) {
                                            notification.success({
                                                message: `You have declined an invitation from the team "${team.name}".`,
                                            });
                                        } else {
                                            notification.error({
                                                message:
                                                    'Something went wrong when joining team',
                                            });
                                        }
                                    } catch (err) {
                                        console.log('ERROR', err);
                                    }
                                },
                            });
                        }}
                    />
                );
            })}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    teamInvites: state.user.teamInvites || [],
});

const mapDispatchToProps = {
    acceptTeamInvite,
    declineTeamInvite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
