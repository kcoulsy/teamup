import React from 'react';

import LoginForm from '../components/LoginForm/LoginForm';
import { Row, Col } from 'antd';

const Login: React.FunctionComponent = (props) => {
    return (
        <div>
            <Row justify="center">
                <Col>
                    <LoginForm {...props} />
                </Col>
            </Row>
        </div>
    );
};

export default Login;
