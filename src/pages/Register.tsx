import React from 'react';

import RegisterForm from '../components/RegisterForm/RegisterForm';
import { Row, Col } from 'antd';

const Register: React.FunctionComponent = () => {
    return (
        <Row justify="center">
            <Col>
                <RegisterForm />
            </Col>
        </Row>
    );
};

export default Register;
