import React from 'react';
import { Form, Input, Button, notification, Modal, PageHeader } from 'antd';
import { updateTeam, leaveTeam } from './../../../actions/team';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PATH_HOME } from './../../../constants/pageRoutes';
import { RootState } from '../../../store/configure';
import hasTeamRole from '../../../helpers/hasTeamRole';
import { PERM_UPDATE_TEAM_DETAILS } from '../../../constants/permissions';
import { Store } from 'antd/lib/form/interface';

const { confirm } = Modal;

interface GeneralSettingsProps {
    teamName: string | null;
    teamDesc: string | null;
    updateTeam: Function;
    leaveTeam: Function;
    canUpdateTeamSettings: boolean;
}
const GeneralSettings: React.FunctionComponent<GeneralSettingsProps> = ({
    teamName,
    teamDesc,
    updateTeam,
    leaveTeam,
    canUpdateTeamSettings,
}) => {
    const history = useHistory();
    const handleUpdate = async ({ teamName, teamDesc }: Store) => {
        const success = await updateTeam({
            name: teamName,
            description: teamDesc,
        });
        if (success) {
            notification.success({
                message: 'Team updated successfully!',
                placement: 'bottomRight',
            });
        } else {
            notification.error({
                message: 'Something went wrong updating team!',
                placement: 'bottomRight',
            });
        }
    };
    return (
        <div>
            <PageHeader
                title="General Settings"
                subTitle={
                    !canUpdateTeamSettings
                        ? 'You do not have permissions to update team settings.'
                        : undefined
                }
                className="team-settings__page-header"
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
                name="teamGeneral"
                initialValues={{ teamName, teamDesc }}
                onFinish={handleUpdate}>
                <Form.Item label="Team Name" name="teamName">
                    <Input disabled={!canUpdateTeamSettings} />
                </Form.Item>

                <Form.Item label="Team Description" name="teamDesc">
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
                        type="primary"
                        htmlType="submit"
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
                            if (done) {
                                notification.success({
                                    message: 'Successfully left the team',
                                });
                                history.push(PATH_HOME);
                            }
                        },
                    });
                }}>
                Leave Team
            </Button>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    teamName: state.team.name,
    teamDesc: state.team.description,
    canUpdateTeamSettings: hasTeamRole(state, PERM_UPDATE_TEAM_DETAILS),
});

const mapDispatchToProps = {
    leaveTeam,
    updateTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
