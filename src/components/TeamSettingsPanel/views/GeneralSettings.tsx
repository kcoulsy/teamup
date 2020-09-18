import React from 'react';
import { Form, Input, Button, Typography, notification, Modal } from 'antd';
import { updateTeam, removeTeam } from './../../../actions/team';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PATH_HOME } from './../../../constants/pageRoutes';
import { RootState } from '../../../store/configure';

const { Title } = Typography;
const { confirm } = Modal;

const GeneralSettings: React.FunctionComponent<{
    teamName: string | null;
    teamDesc: string | null;
    updateTeam: Function;
    removeTeam: Function;
}> = ({ teamName, teamDesc, updateTeam, removeTeam }) => {
    const history = useHistory();
    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                General Settings
            </Title>
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
                onFinish={async ({ teamName, teamDesc }) => {
                    const success = await updateTeam({
                        name: teamName,
                        description: teamDesc,
                    });
                    if (success) {
                        notification.success({
                            message: 'Team updated successfully!',
                        });
                    } else {
                        notification.error({
                            message: 'Something went wrong updating team!',
                        });
                    }
                }}>
                <Form.Item label="Team Name" name="teamName">
                    <Input />
                </Form.Item>

                <Form.Item label="Team Description" name="teamDesc">
                    <Input.TextArea />
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
                    <Button type="primary" htmlType="submit">
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
                            const done = await removeTeam();
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
});

const mapDispatchToProps = {
    removeTeam,
    updateTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
