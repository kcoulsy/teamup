import React from 'react';
import { Card, Form, Button, notification } from 'antd';
import { createTeam } from '../actions/team';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PATH_TEAM_PROFILE } from './../constants/pageRoutes';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Home: React.FunctionComponent<{ createTeam: Function }> = ({
    createTeam,
}) => {
    const history = useHistory();
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

const mapDispatchToProps = {
    createTeam: createTeam,
};

export default connect(undefined, mapDispatchToProps)(Home);
