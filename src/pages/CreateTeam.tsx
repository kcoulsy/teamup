import React from 'react';
import { Card, Form, Button, notification, Input } from 'antd';
import { createTeam } from '../actions/team';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { PATH_TEAM_PROFILE } from './../constants/pageRoutes';
import { RootState } from '../store/configure';
import hasTeam from '../helpers/hasTeam';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CreateTeamPage: React.FunctionComponent<{
    createTeam: Function;
    hasTeamFromState: boolean;
}> = ({ createTeam, hasTeamFromState }) => {
    const history = useHistory();

    if (hasTeamFromState) {
        return <Redirect to={PATH_TEAM_PROFILE} />;
    }

    return (
        <div>
            <Card title="Create Team">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={async ({ teamName, teamDesc }) => {
                        const done = await createTeam({
                            name: teamName,
                            description: teamDesc,
                        });
                        if (done) {
                            notification.success({ message: 'Team Created' });
                            history.push(PATH_TEAM_PROFILE);
                        }
                    }}>
                    <Form.Item label="Team Name" name="teamName">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Team Description" name="teamDesc">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Create Team
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        hasTeamFromState: hasTeam(state),
    };
};

const mapDispatchToProps = {
    createTeam: createTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamPage);
