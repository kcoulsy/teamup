import React from 'react';
import { Card, Form, Button, notification } from 'antd';
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
                    onFinish={async () => {
                        const done = await createTeam();
                        if (done) {
                            notification.success({ message: 'Team Created' });
                            history.push(PATH_TEAM_PROFILE);
                        }
                    }}>
                    Other fields will be added here
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
